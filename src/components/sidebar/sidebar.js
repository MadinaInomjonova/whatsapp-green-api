import { Link } from "react-router-dom";

import { SidebarChat } from "../";

import { IconButton } from "@mui/material";
import { MoreHoriz, OpenInNew, Search } from "@mui/icons-material";
import "./sidebar.css";

const Sidebar = ({ rooms }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h3>Chats</h3>
        <div className="sidebar__headerRight">
          <Link to="/create">
            <IconButton>
              <OpenInNew />
            </IconButton>
          </Link>
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
        {rooms?.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
