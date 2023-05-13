import { SidebarChat } from "../";

import { IconButton } from "@mui/material";
import { MoreHoriz, OpenInNew, Search } from "@mui/icons-material";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h3>Chats</h3>
        <div className="sidebar__headerRight">
          <IconButton>
            <OpenInNew />
          </IconButton>
          <IconButton>
            <MoreHoriz />
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
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
