import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/side_navbar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { FaUserEdit } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(""); // Store selected profile picture
  const username = useParams().username;
  const imgRef = useRef(null);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/?username=${username}`);
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUser();
  }, [username]);

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        userId: currentUser._id,
        profilePicture: profilePicture,
      };
      const response = await axios.put(`/users/${user._id}`, requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update user data or perform any necessary action upon successful upload
      console.log("Profile picture updated:", response.data);
      setProfilePicture(null);
      setIsEditing(false);

      // Upload the selected profile picture
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <>
      <div className="profile">
        <div className="editOption" onClick={handleClick}>
          {!isEditing ? <FaUserEdit /> : <p onClick={handleSubmit}>Save</p>}
        </div>
        <div className="profileRight">
          <img
            className="profileCoverImg"
            src={
              user.coverPicture
                ? PublicFolder + user.coverPicture
                : `${PublicFolder}/person/noCover.jpeg`
            }
            alt=""
          />
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PublicFolder + user.profilePicture
                    : `${PublicFolder}/person/no_avatar.jpeg`
                }
                alt=""
              />
              {isEditing && (
                <>
                  <label className="editBtn" htmlFor="imgUpload">
                    <MdModeEditOutline />
                  </label>
                  <input
                    type="file"
                    id="imgUpload"
                    ref={imgRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange} // Handle file change event
                  />
                </>
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
