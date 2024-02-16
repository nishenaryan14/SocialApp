import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/side_navbar/Sidebar";
import "./home.css";
import { useState } from "react";
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <Topbar />
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
          <Feed />
          <Rightbar />
        </div>
      </div>
    </>
  );
};
export default Home;
