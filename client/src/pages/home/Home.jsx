import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/side_navbar/Sidebar";
import "./home.css";
import { useState } from "react";
import Timeline from "../timeline/Timeline";
import Profile from "../profile/Profile";
import { Routes, Route } from "react-router-dom";
import Chat from "../chat/Chat";
import Messenger from "../messenger/Messenger";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="homeContainer">
        <div className="sidebarContainer">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div
          className={`homeContainerWrapper ${
            isSidebarOpen && "homeContainerSlide"
          }`}
        >
          <Topbar />
          <div className="homeContainerInnerWrapper">
            <Routes>
              <Route path="/" element={<Timeline />} />
              <Route path="chats" element={<Messenger />} />
              <Route path="profile/:username" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
