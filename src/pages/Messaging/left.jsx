import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import io from "socket.io-client";
import UsersList from "./UsersList";
import Messages from "./Message";

const connOpt = {
  transports: ["websocket"],
};
const url = "https://striveschool-api.herokuapp.com/api/messages/";
let socket = io("https://striveschool-api.herokuapp.com/", connOpt);
const MessagesBlock = (props) => {
  const { userName } = props;
  const [currentReciver, setCurrentReciver] = useState("");
  const [onlineUsers, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageNotification, setMessageNotification] = useState([]);

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  useEffect(() => {
    getMessages();
    socket.emit("setUsername", {
      username: userName,
    });
    socket.on("list", (list) => setUsers(list.filter(unique)));
    socket.on("chatmessage", (msg) => {
      setMessages((messages) => messages.concat(msg));
      setMessageNotification((messageNotification) => messageNotification.concat(msg.from));
      console.log(messageNotification.length, messages.length);
    });
    setCurrentReciver(onlineUsers.find((user) => user !== userName));
  }, []);

  const getMessages = async () => {
    const msgs = await fetch(url + userName);
    const messages = await msgs.json();
    if (messages) setMessages(messages);
    else console.log(messages);
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
          <UsersList
            {...props}
            currentReciver={currentReciver}
            onlineUsers={onlineUsers}
            notifications={messageNotification}
            setCurrentReciver={setCurrentReciver}
            setNotifications={setMessageNotification}
          />
        </Col>
        <Col sm={7} className='py-3 px-0 pr-3'>
          <Messages {...props} currentReciver={currentReciver} messages={messages} sendMessage={sendMessage} notifications={messageNotification} setNotifications={setMessageNotification} />
        </Col>
      </Row>
    </div>
  );
};

export default MessagesBlock;
