import { useContext, useRef, useState } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import axios from "axios";
import { useTheme } from "../../context/ColorContext";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSearch = async () => {
    const username = searchRef.current.value.trim();
    if (!username) {
      return;
    }
    setSearch(username);
    try {
      const userData = await getUser(username);
      if (userData) {
        navigate(`/profile/${username}`);
      } else {
        // Handle user not found
        console.log("User not found");
      }
    } catch (error) {
      // Handle API error
      console.error("Error fetching user data:", error);
    }
  };

  const getUser = async (username) => {
    try {
      const response = await axios.get(`/users/`, { params: { username } });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={`topbarContainer ${theme && "light"}`}>
      <div className="topbarLeft">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Timeline</span>
        </div>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            ref={searchRef}
            name="searchInput"
            placeholder="Search for friend, post, or video"
            className="searchInput"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <span onClick={handleSearch} className="search">
            Search
          </span>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>

        <button className="toggle" onClick={() => setTheme(!theme)}>
          {theme ? <MdDarkMode /> : <CiLight />}
        </button>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : `${PF}/person/no_avatar.jpeg`
            }
            alt=""
            className="topbarImage"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
