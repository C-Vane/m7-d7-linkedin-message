import React from "react";

const OnlineUser = ({ user, currentReciver, setCurrentReciver }) => {
  return (
    <div className={user === currentReciver ? "current-onlineUsers d-flex p-3" : "onlineUsers d-flex p-3"} onClick={() => setCurrentReciver && setCurrentReciver(user)}>
      <img className='image mr-3 rounded-circle' src={"https://image.flaticon.com/icons/png/512/17/17004.png"} alt='user-img' height='60px' />
      <p className='font-weight-bold mb-0' style={{ width: "95%" }}>
        {user}
      </p>
    </div>
  );
};

export default OnlineUser;
