import React, { useEffect, useState } from "react";
import { getFunction } from "./CRUDFunctions";
import CurrentUser from "./CurrentUser";
import OnlineUser from "./OnlineUser";

const OnlineUserHandler = ({ user, currentReciver, setCurrentReciver, notifications, setNotifications }) => {
  const [recivingUser, setRecivingUser] = useState({});
  const [notification, setNotification] = useState(0);
  useEffect(() => {
    getUser();
    setNotification(notifications.filter((n) => n === user).length);
  }, []);
  const getUser = async () => {
    const data = await getFunction("profile/" + user);
    if (data) setRecivingUser(data);
    else console.log(user);
  };
  const setCurrent = (user) => {
    setNotifications(notifications.filter((n) => n !== user));
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
        />
      ) : (
        <OnlineUser user={user} setCurrentReciver={setCurrent} currentReciver={currentReciver} notification={notification} />
      )}
    </div>
  );
};

export default OnlineUserHandler;
