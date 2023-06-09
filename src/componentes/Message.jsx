import React from 'react';
import "./Message.css"

const Message = ({ message, message2, success }) => {
  const color = success ? '#28A745' : '#DC3545';
  const title = success ? 'Sucesso' : 'Falha';

  return (
    <div className="message-container" style={{ backgroundColor: color }}>
      <h3 className="message-title">{title}</h3>
      <p className="message-text">{message}</p>
      <p className="message-text">{message2}</p>
    </div>
  );
};

export default Message;
