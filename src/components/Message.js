import React, { useEffect } from 'react';
import './Message.css'

function Message({ message, clearMessage }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 5000);

      return () => clearTimeout(timer); // Clear timeout if the component unmounts or message changes
    }
  }, [message, clearMessage]);

  return (
    message && (
      <div className="registration-message">
        <p>{message}</p>
      </div>
    )
  );
}

export default Message;
