import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
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
  const [user, setUser] = useState("");
  const [currentReciver, setCurrentReciver] = useState("");
  const [onlineUsers, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  useEffect(() => {
    getMessages();
    socket.emit("setUsername", {
      username: userName,
    });
    socket.on("list", (list) => setUsers(list.filter(unique)));
    socket.on("chatmessage", (msg) => setMessages((messages) => messages.concat(msg)));
    onlineUsers.length > 0 && setCurrentReciver(onlineUsers.find((user) => user !== userName));
  }, []);

  const getMessages = async () => {
    const msgs = await fetch(url + userName);
    const messages = await msgs.json();
    console.log(messages);
    if (messages) setMessages(messages);
    else console.log(messages);
  };
  const sendMessage = (msg) => {
    socket.emit("chatmessage", {
      to: currentReciver,
      text: msg,
    });
    setMessages((messages) => messages.concat({ from: userName, to: currentReciver, text: msg, createdAt: new Date() }));
    console.log(msg);
  };
  return (
    <div className='feed-right-container mb-3 p-0'>
      <Row>
        <Col sm={5} className='brdr-right py-3 pr-0'>
          <UsersList {...props} currentReciver={currentReciver} onlineUsers={onlineUsers} setCurrentReciver={setCurrentReciver} />
        </Col>
        <Col sm={7} className='py-3 px-0 pr-3'>
          <Messages {...props} currentReciver={currentReciver} messages={messages} sendMessage={sendMessage} />
        </Col>
      </Row>
    </div>
  );
};

export default MessagesBlock;
