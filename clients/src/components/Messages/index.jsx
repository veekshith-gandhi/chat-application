/** @format */

import React from "react";

import Message from "../Message/index";

const Messages = ({ messages, name }) => {
  return (
    <div
      style={{
        overflow: "auto",
        padding: " 5% 0",
        flex: "auto",
      }}
    >
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
