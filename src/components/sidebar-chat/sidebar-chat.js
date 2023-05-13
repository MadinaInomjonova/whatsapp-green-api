import { useEffect, useState } from "react";

import { Avatar } from "@mui/material";
import "./sidebar-chat.css";

const SidebarChat = () => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidebar__chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebar__chatInfo">
        <h2>room name</h2>
        <p>last message...</p>
      </div>
    </div>
  );
};

export default SidebarChat;
