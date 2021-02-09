import React from "react";
import { Link } from "react-router-dom";

const CurrentUser = ({ user, userName, name, profilePicture, jobTitle, currentReciver, setCurrentReciver }) => {
  return (
    <div className={user === currentReciver && setCurrentReciver ? "current-onlineUsers d-flex p-3" : "onlineUsers d-flex p-3"} onClick={() => setCurrentReciver && setCurrentReciver(user)}>
      <img className='image mr-3 rounded-circle' src={profilePicture} alt='user-img' height='60px' />

      <div className='d-flex flex-column'>
        <Link to={"/profile/" + userName}>
          <span className='font-weight-bold mb-0' style={{ width: "95%" }}>
            {name}
          </span>
        </Link>
        <span>{jobTitle}</span>
      </div>
    </div>
  );
};

export default CurrentUser;
