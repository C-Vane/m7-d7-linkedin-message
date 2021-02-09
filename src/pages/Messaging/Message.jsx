import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
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
    getUser();
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
  };
  return (
    <div className='message-box'>
      <div className='brdr-bottom m-0 d-flex pb-2 justify-content-between'>
        <div>
          <b>
            {recivingUser._id ? (
              <>
                <p>{recivingUser.name + " " + recivingUser.surname}</p>
                <small>Active Now</small>
              </>
            ) : (
              <p>{currentUser}</p>
            )}
          </b>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant='light' className='rounded-pill' style={{ fontSize: "1.5rem", color: "rgba(0,0,0,0.5)" }}>
              <i className='fas fa-ellipsis-h'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item className='p-2' href='#/action-1'>
                Create group chat
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className='p-2'>Archive</Dropdown.Item>
              <Dropdown.Item className='p-2'>Delete</Dropdown.Item>
              <Dropdown.Item className='p-2'>Mark as unread</Dropdown.Item>
              <Dropdown.Item className='p-2'>Mute</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className='p-2'>Report</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
                      <CurrentUser jobTitle={recivingUser.title} name={recivingUser.name + " " + recivingUser.surname} userName={recivingUser.username} profilePicture={recivingUser.image} />
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
        <Form>
          <Form.Group className='brdr-bottom'>
            <Form.Control as='textarea' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Write a message...' />
          </Form.Group>
          <Row className='justify-content-between'>
            <Col sm={6}>
              <div className='d-flex icons p-0 m-0'>
                <Button variant='link' className='d-flex align-items-center justify-content-center py-4 m-0'>
                  <i className='fas fa-plus text-primary'></i>
                </Button>
                <Button variant='link' className='d-flex align-items-center justify-content-center py-4'>
                  <i className='far fa-image'></i>
                </Button>
                <Button variant='link' className='d-flex align-items-center justify-content-center py-4'>
                  <i className='fab fa-youtube'></i>
                </Button>
                <Button variant='link' className='d-flex align-items-center justify-content-center py-4'>
                  <i className='fas fa-sticky-note'></i>
                </Button>
              </div>
            </Col>
            <Col sm='6'>
              <div className='d-flex float-right mt-2'>
                <Button className='rounded-pill px-4 py-0 m-0' onClick={sendMessageHandler} disabled={message.length < 1}>
                  Send
                </Button>
                <Dropdown>
                  <Dropdown.Toggle variant='light' className='rounded-pill' style={{ fontSize: "1.5rem", color: "rgba(0,0,0,0.5)" }}>
                    <i className='fas fa-ellipsis-h'></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item className='p-2' href='#/action-1'>
                      Create group chat
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className='p-2'>Archive</Dropdown.Item>
                    <Dropdown.Item className='p-2'>Delete</Dropdown.Item>
                    <Dropdown.Item className='p-2'>Mark as unread</Dropdown.Item>
                    <Dropdown.Item className='p-2'>Mute</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className='p-2'>Report</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Message;
