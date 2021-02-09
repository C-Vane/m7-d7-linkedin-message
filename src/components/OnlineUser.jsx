import React from "react";
import { Badge } from "react-bootstrap";

const OnlineUser = ({ user, currentReciver, setCurrentReciver, notification }) => {
  return (
    <div className={user === currentReciver ? "current-onlineUsers wrap d-flex p-3" : "onlineUsers wrap d-flex p-3"} onClick={() => setCurrentReciver && setCurrentReciver(user)}>
      <div className='d-flex '>
        <div className='d-flex'>
          <img className='image mr-3 rounded-circle' src={"https://image.flaticon.com/icons/png/512/17/17004.png"} alt='user-img' height='60px' />
          <p className='font-weight-bold mb-0' style={{ width: "95%" }}>
            {user}
          </p>
        </div>
        <div className='notification-badge'>
          {notification >= 0 && (
            <Badge variant='primary' className='p-1' pill>
              <small>{notification}</small>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineUser;
