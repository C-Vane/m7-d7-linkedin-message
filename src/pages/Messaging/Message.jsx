import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import Moment from "react-moment";
import { getFunction } from "../../components/CRUDFunctions";
import CurrentUser from "../../components/CurrentUser";
import OnlineUser from "../../components/OnlineUser";

const Message = ({ jobTitle, name, userName, profilePicture, sendMessage, currentReciver, messages, setNotifications, notifications, online }) => {
  const [currentUser, setcurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [recivingUser, setRecivingUser] = useState({});
  const [sendOnEnter, setSendOnEnter] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setcurrentUser(currentReciver);
    setMessageList(messages);
    getUser();
    scrollToBottom();
  }, []);

  useEffect(() => {
    getUser();
    setLoading(false);
    setcurrentUser(currentReciver);
    setMessageList(messages);
    setRecivingUser({});
    scrollToBottom();
  }, [currentReciver, messages]);

  const scrollToBottom = () => {
    const messagesDiv = document.getElementsByClassName("messages")[0];
    if (messagesDiv && !loading) messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    sendMessage(message);
    console.log(notifications);
    setNotifications([...notifications.filter((notification) => notification !== currentReciver)]);
    setMessage("");
    scrollToBottom();
  };
  const getUser = async () => {
    const user = await getFunction("profile/" + currentReciver);
    if (user) setRecivingUser(user);
  };
  return (
    <div className='message-box'>
      {!loading ? (
        <>
          <div className='brdr-bottom m-0 d-flex pb-0 justify-content-between'>
            <div className='pl-3 pb-0 m-0'>
              <b>
                {recivingUser._id ? (
                  <>
                    <p className='p-0 m-0'>{recivingUser.name + " " + recivingUser.surname}</p>
                  </>
                ) : (
                  <p className='p-0 m-0'>{currentReciver}</p>
                )}
              </b>
              {online ? (
                <small>
                  {" "}
                  <Badge variant='success' className='p-1 mr-2' pill>
                    {" "}
                  </Badge>
                  Active Now
                </small>
              ) : (
                <small className='text-muted'>
                  {" "}
                  <Badge variant='secondary' className='p-1 mr-2' pill>
                    {" "}
                  </Badge>
                  Offline Now
                </small>
              )}
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
                (message.from === currentReciver || message.to === currentReciver) && (
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
          <div className='write-message' onKeyDown={(e) => e.key === "Enter" && sendOnEnter && sendMessageHandler(e)}>
            <Form onSubmit={sendMessageHandler}>
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
                    <Button className={sendOnEnter ? "d-none" : "rounded-pill px-4 py-0 m-0"} type='submit' disabled={message.length < 1}>
                      Send
                    </Button>
                    <Dropdown>
                      <Dropdown.Toggle variant='light' className='rounded-pill' style={{ fontSize: "1.5rem", color: "rgba(0,0,0,0.5)" }}>
                        <i className='fas fa-ellipsis-h'></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className='p-2'>
                        <Dropdown.Item onClick={() => setSendOnEnter(true)}>
                          <label>
                            <input type='radio' className='m-1' value={true} name='OnEnter' checked={sendOnEnter} />
                            Send on enter
                          </label>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSendOnEnter(false)}>
                          <label>
                            <input type='radio' className='m-1' value={false} name='OnEnter' checked={!sendOnEnter} />
                            Send on Send
                          </label>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>{" "}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Message;
