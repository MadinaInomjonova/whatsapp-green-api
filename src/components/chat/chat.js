import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/compat/app";

import db from "../../firebase";

import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  Call,
  InsertEmoticon,
  Search,
  Send,
  Videocam,
} from "@mui/icons-material";
import "./chat.css";

const Chat = ({ user }) => {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => setRoomName(snapshot.data()?.name));

    db.collection("rooms")
      .doc(roomId)
      .collection("message")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  console.log(messages);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("message").add({
      message: input,
      name: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <p className="username">{roomName}</p>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <Videocam />
          </IconButton>
          <IconButton>
            <Call />
          </IconButton>
          <IconButton className="search__icon">
            <Search />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.email && "chat__reciever"
            }`}
          >
            {message?.message} <span className="chat__timestamp">3:53pm</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <div className="chat__footerIcon">
          <InsertEmoticon />
          <AttachFile />
        </div>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
