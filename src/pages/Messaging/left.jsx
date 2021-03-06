import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import io from "socket.io-client";
import UsersList from "./UsersList";
import Messages from "./Message";
import { getUniqueUsersAndMessages, uniqueObject } from "../../components/CRUDFunctions";
import PostLoader from "../../components/loaders/PostLoader";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
});
const connOpt = {
  transports: ["websocket"],
};
const url = "https://striveschool-api.herokuapp.com/api/messages/";
let socket = io("https://striveschool-api.herokuapp.com/", connOpt);
const MessagesBlock = (props) => {
  // const { userName, setNotification, users, socket, messages, messageNotification, currentReciver } = props;
  const { userName, setNotification } = props;
  const [currentReciver, setCurrentReciver] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [messageNotification, setMessageNot] = useState([]);

  const setMessageNotification = (value) => {
    localStorage.setItem("message_notification", JSON.stringify([...value]));
    setMessageNot(value);
  };

  useEffect(() => {
    const messageNot = JSON.parse(localStorage.getItem("message_notification"));
    messageNot && setMessageNot([...messageNot]);
    console.log(messageNotification);
    socket.emit("setUsername", {
      username: userName,
    });
    socket.on("list", (list) => {
      setOnlineUsers(list.filter(uniqueObject));
    });
    socket.on("chatmessage", (msg) => {
      setMessages((messages) => messages.concat(msg));
      setMessageNotification([...JSON.parse(localStorage.getItem("message_notification"))].concat(msg.from));
      console.log(messageNotification);
    });
    getMessages();
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentReciver === undefined || currentReciver === "") {
      if (onlineUsers.length > 0) {
        setCurrentReciver(onlineUsers[0]);
      } else {
        setCurrentReciver(offlineUsers[0]);
      }
    }
    messages.length > 0 && setOfflineUsers(getUniqueUsersAndMessages(messages, onlineUsers));
    messageNotification.length > 0 ? setNotification(true) : setNotification(false);
  }, [onlineUsers, messages, currentReciver, messageNotification]);

  const getMessages = async () => {
    const msgs = await fetch(url + userName);
    const messages = await msgs.json();
    if (messages) {
      setMessages(messages);
      setLoading(false);
    } else console.log(messages);
  };

  const sendMessage = (msg) => {
    socket.emit("chatmessage", {
      from: userName,
      to: currentReciver,
      text: msg,
    });

    setMessages([...messages, { from: userName, to: currentReciver, text: msg, createdAt: new Date() }]);
  };

  return (
    <div className='feed-right-container mb-3 p-0'>
      <Row>
        <Col sm={5} className='brdr-right py-3 pr-0'>
          {loading ? (
            <PostLoader />
          ) : (
            <UsersList
              {...props}
              currentReciver={currentReciver}
              onlineUsers={onlineUsers}
              notifications={messageNotification}
              setCurrentReciver={setCurrentReciver}
              setNotifications={setMessageNotification}
              offlineUsers={offlineUsers}
            />
          )}
        </Col>
        <Col sm={7} className='pt-2 pb-3 px-0 pr-3'>
          {loading ? (
            <PostLoader />
          ) : (
            <Messages
              {...props}
              currentReciver={currentReciver}
              online={onlineUsers.includes(currentReciver)}
              messages={messages}
              sendMessage={sendMessage}
              notifications={messageNotification}
              setNotifications={setMessageNotification}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesBlock);
