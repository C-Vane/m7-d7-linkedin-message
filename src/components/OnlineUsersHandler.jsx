import React, { useEffect, useState } from "react";
import { getFunction } from "./CRUDFunctions";
import CurrentUser from "./CurrentUser";
import OnlineUser from "./OnlineUser";

const OnlineUserHandler = ({ user, currentReciver, setCurrentReciver }) => {
  const [recivingUser, setRecivingUser] = useState({});
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const data = await getFunction("profile/" + user);
    if (data) setRecivingUser(data);
    else console.log(user);
  };
  return (
    <div>
      {recivingUser._id ? (
        <CurrentUser
          jobTitle={recivingUser.title}
          name={recivingUser.name + " " + recivingUser.surname}
          setCurrentReciver={setCurrentReciver}
          user={user}
          currentReciver={currentReciver}
          userName={recivingUser.username}
          profilePicture={recivingUser.image}
        />
      ) : (
        <OnlineUser user={user} setCurrentReciver={setCurrentReciver} currentReciver={currentReciver} />
      )}
    </div>
  );
};

export default OnlineUserHandler;
