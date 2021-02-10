import React from "react";
import OnlineUserHandler from "../../components/OnlineUsersHandler";

const UsersList = ({ onlineUsers, currentReciver, userName, setCurrentReciver, notifications, setNotifications }) => {
  return (
    <div>
      <div className='brdr-bottom m-0 pb-3 '>
        <b className='px-3'>Messaging</b>
      </div>
      <div className='userList'>
        {onlineUsers.map(
          (user) =>
            user !== userName && (
              <OnlineUserHandler currentReciver={currentReciver} setCurrentReciver={setCurrentReciver} user={user} notifications={notifications} setNotifications={setNotifications} />
            )
        )}
      </div>
    </div>
  );
};

export default UsersList;
