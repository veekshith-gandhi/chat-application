/** @format */

import { useEffect, useState } from "react";
import styles from "./chat.module.css";
import queryString from "query-string";

import io from "socket.io-client";
import InfoBar from "../Infobar";
import Input from "../Input/index";
import Messages from "../Messages";
import TextContainer from "../TextContainer";

let socket;
const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:8080";

  useEffect(() => {
    const { name, room } = queryString.parse(document.location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, [ENDPOINT, document.location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });
    // console.log(messages);

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          setMessage={setMessage}
          sendMessage={sendMessage}
          message={message}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
