import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Moment from "react-moment";
import { getFunction } from "../../components/CRUDFunctions";
import CurrentUser from "../../components/CurrentUser";
import OnlineUser from "../../components/OnlineUser";

const Message = ({ jobTitle, name, userName, profilePicture, sendMessage, currentReciver, messages }) => {
  const [currentUser, setcurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [recivingUser, setRecivingUser] = useState({});

  useEffect(() => {
    setcurrentUser(currentReciver);
    setMessageList(messages);
    getUser();
  }, []);

  useEffect(() => {
    setcurrentUser(currentReciver);
    setMessageList(messages);
  }, [currentReciver, messages]);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };
  const getUser = async () => {
    const user = await getFunction("profile/" + currentReciver);
    console.log(user);
    if (user) setRecivingUser(user);
    else console.log(user);
  };
  return (
    <div>
      <div className='brdr-bottom m-0 pb-3'>
        <b className='p-3'>{currentUser}</b>
      </div>

      <div className='brdr-bottom messages'>
        {messageList.map(
          (message) =>
            (message.from === currentUser || message.to === currentUser) && (
              <>
                {" "}
                <div className='d-flex'>
                  {}
                  {message.from !== userName ? (
                    recivingUser._id ? (
                      <CurrentUser jobTitle={recivingUser.title} name={recivingUser.name + " " + recivingUser.surname} userName={recivingUser.nameusername} profilePicture={recivingUser.image} />
                    ) : (
                      <OnlineUser user={message.from} />
                    )
                  ) : (
                    <CurrentUser jobTitle={jobTitle} name={name} userName={userName} profilePicture={profilePicture} />
                  )}
                  <small className='text-muted pt-3 mt-1'>
                    <Moment fromNow>{message.createdAt}</Moment>
                  </small>
                </div>{" "}
                <p className='pl-5'>{message.text || message.msg}</p>
              </>
            )
        )}
      </div>
      <div className='write-message'>
        <Form onSubmit={sendMessageHandler}>
          <Form.Group>
            <Form.Control as='textarea' value={message} onChange={(e) => setMessage(e.target.value)} />
          </Form.Group>
          <Button className='rounded-pill mr-0' type='submit' disabled={message.length < 1}>
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Message;
