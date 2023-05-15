import { useEffect, useState } from "react";

import { SidebarChat } from "../";
import { db } from "../../firebase";

import { IconButton } from "@mui/material";
import { MoreHoriz, OpenInNew, Search } from "@mui/icons-material";
import "./sidebar.css";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);

  const createChat = () => {
    const roomName = prompt("please enter name for chat room");

    db.collection("rooms").add({
      name: roomName,
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h3>Chats</h3>
        <div className="sidebar__headerRight">
          <IconButton onClick={createChat}>
            <OpenInNew />
          </IconButton>
          <IconButton>
            <MoreHoriz className="more__icon" />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <input type="text" placeholder="Search or start a new chat" />
          <Search />
        </div>
      </div>

      <div className="sidebar__chats">
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
