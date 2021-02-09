import React, { useEffect, useState } from "react";
import { getFunction } from "../../components/CRUDFunctions";
import CurrentUser from "../../components/CurrentUser";
import OnlineUser from "../../components/OnlineUser";
import OnlineUserHandler from "../../components/OnlineUsersHandler";

const UsersList = ({ onlineUsers, currentReciver, userName, setCurrentReciver }) => {
  const [recivingUser, setRecivingUser] = useState({});
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const user = await getFunction("profile/" + currentReciver);
    if (user) setRecivingUser(user);
    else console.log(user);
  };
  return (
    <div>
      <div className='brdr-bottom m-0 pb-3 userList'>
        <b className='px-3'>Messaging</b>
      </div>
      <div>{onlineUsers.map((user) => user !== userName && <OnlineUserHandler currentReciver={currentReciver} setCurrentReciver={setCurrentReciver} user={user} />)}</div>
    </div>
  );
};

export default UsersList;
