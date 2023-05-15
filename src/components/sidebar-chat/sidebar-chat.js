import { useEffect, useState } from "react";

import { Avatar } from "@mui/material";
import "./sidebar-chat.css";
import { Link } from "react-router-dom";
import db from "../../firebase";

const SidebarChat = ({ id, name }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("message")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar__chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebar__chatInfo">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
