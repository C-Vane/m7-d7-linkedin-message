import React from "react";
import OnlineUserHandler from "../../components/OnlineUsersHandler";

const UsersList = ({ onlineUsers, currentReciver, userName, setCurrentReciver, notifications, setNotifications, offlineUsers }) => {
  //console.log(notifications);
  return (
    <div>
      <div className='brdr-bottom m-0 pb-3 '>
        <b className='px-3'>Messaging</b>
      </div>
      <div className='userList'>
        <div>
          {onlineUsers.map(
            (user) =>
              user !== userName && (
                <OnlineUserHandler currentReciver={currentReciver} setCurrentReciver={setCurrentReciver} user={user} notifications={notifications} setNotifications={setNotifications} online={true} />
              )
          )}
        </div>
        <div>
          {offlineUsers.map(
            (user) =>
              user !== userName && (
                <OnlineUserHandler currentReciver={currentReciver} setCurrentReciver={setCurrentReciver} user={user} notifications={notifications} setNotifications={setNotifications} online={false} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
