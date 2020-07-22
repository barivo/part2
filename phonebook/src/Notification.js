import React from "react";

const Notification = ({ message, setMessage }) => {
  if (message.type === null) {
    return null;
  } else {
    setTimeout(() => setMessage({ type: null, text: null }), 4000);
    return <div className={message.type}>{message.text}</div>;
  }
};
export default Notification;
