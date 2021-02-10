import React from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const CurrentUser = ({ user, userName, name, profilePicture, jobTitle, currentReciver, setCurrentReciver, notification, online }) => {
  return (
    <div className={user === currentReciver && setCurrentReciver ? "current-onlineUsers wrap d-flex p-3" : "onlineUsers wrap d-flex p-3"} onClick={() => setCurrentReciver && setCurrentReciver(user)}>
      <div className='relative'>
        <img className='image mr-3 rounded-circle' src={profilePicture} alt='user-img' height='60px'></img>
        {currentReciver && (
          <Badge variant={online ? "success" : "secondary"} className='p-2 mr-2 ' pill>
            {" "}
          </Badge>
        )}
      </div>
      <div className='d-flex  justify-content-between'>
        <div className='d-flex flex-column'>
          <Link to={"/profile/" + userName}>
            <span className='font-weight-bold mb-0' style={{ width: "95%" }}>
              {name}
            </span>
          </Link>
          <span>{currentReciver && jobTitle}</span>
        </div>
        <div className='notification-badge'>
          {notification > 0 && (
            <Badge variant='primary' className='p-1' pill>
              <small>{notification}</small>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentUser;
