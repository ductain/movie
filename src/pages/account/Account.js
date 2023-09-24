import React, { useEffect, useState } from "react";
import "./account.scss";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase/Firebase";

export default function Account() {
  const { user, updateUserProfile } = UserAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const handleProfileImageChange = (e) => {
    setFile(e.target.files[0]);
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleChange = (e) => {
    setDisplayName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (displayName.trim() !== "") {
      try {
        if (file !== null) {
          const fileName = new Date().getTime() + file.name;
          const storage = getStorage(app);
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
              }
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateUserProfile({ displayName, photoURL: downloadURL });
                alert("Profile updated successfully!");
                navigate("/");
              });
            }
          );
        } else {
          updateUserProfile({ displayName });
          alert("Profile updated successfully!");
          navigate("/");
        }
      } catch (error) {
        alert("Error updating profile");
        console.log(error);
      }
    } else {
      alert("Display name cannot be empty");
    }
  };
  useEffect(() => {
    setDisplayName(user.displayName || "");
    setProfileImage(user.photoURL || "");
  }, [user]);
  return (
    <div className="account">
      <form onSubmit={handleSubmit}>
        <div className="profileImg">
          <img src={profileImage} alt="" />
          <div className="uploadImgButton">
            <label htmlFor="file">
              Image: <DriveFolderUploadIcon style={{ cursor: "pointer" }} />
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <label>Name</label>
        <input
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
        <label>Email</label>
        <input type="text" name="email" value={user.email} readOnly />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
