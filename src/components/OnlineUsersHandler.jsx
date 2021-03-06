import React, { useEffect, useState } from "react";
import { getFunction } from "./CRUDFunctions";
import CurrentUser from "./CurrentUser";
import OnlineUser from "./OnlineUser";

const OnlineUserHandler = ({ user, currentReciver, setCurrentReciver, notifications, setNotifications, online }) => {
  const [recivingUser, setRecivingUser] = useState({});
  const [notification, setNotification] = useState(0);
  useEffect(() => {
    setNotification(notifications.filter((n) => n === user).length);
  }, [notifications]);

  useEffect(() => {
    getUser();
    setNotification(notifications.filter((n) => n === user).length);
  }, []);
  const getUser = async () => {
    const data = await getFunction("profile/" + user);
    if (data) setRecivingUser(data);
  };
  const setCurrent = (user) => {
    const updatedNotification = notifications.filter((n) => n !== user);
    notifications && setNotifications(updatedNotification);
    setCurrentReciver(user);
  };
  return (
    <div>
      {recivingUser._id ? (
        <CurrentUser
          jobTitle={recivingUser.title}
          name={recivingUser.name + " " + recivingUser.surname}
          setCurrentReciver={setCurrent}
          user={user}
          currentReciver={currentReciver}
          userName={recivingUser.username}
          profilePicture={recivingUser.image}
          notification={notification}
          online={online}
        />
      ) : (
        <OnlineUser user={user} setCurrentReciver={setCurrent} currentReciver={currentReciver} notification={notification} online={online} />
      )}
    </div>
  );
};

export default OnlineUserHandler;
