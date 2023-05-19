import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Avatar } from "@mui/material";
import "./sidebar-chat.css";

const SidebarChat = ({ id, name }) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar__chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebar__chatInfo">
          <h2>{name}</h2>
          <p>last message ...</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
