import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultProfilePicture from "../defaultprofile.png";
import "./MyPage.css";

function MyPage() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    birthday: "",
    email: "",
    profilePicture: defaultProfilePicture,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/userinfo")
      .then((response) => {
        const data = response.data;
        setUserInfo({
          name: data.name,
          birthday: data.birthday,
          email: data.email,
          profilePicture: data.profilePicture,
        });
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, []);

  const handleProfilePictureChange = (event) => {
    const newProfilePicture = event.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", newProfilePicture);
    formData.append("userId", userInfo.userId);

    axios
      .post("http://localhost:8081/upload", formData)
      .then(() => {
        const imageUrl = URL.createObjectURL(newProfilePicture);
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          profilePicture: imageUrl,
        }));
      })
      .catch((error) => {
        console.error("Error uploading profile picture:", error);
        alert("Failed to upload profile picture.");
      });
  };

  const handleEditProfilePicturesClick = () => {
    document.getElementById("profilePicture").click();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (confirmPassword && event.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (password !== event.target.value) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!passwordError && password === confirmPassword) {
      const formData = {
        newPassword: password,
      };
      axios
        .post("http://localhost:8081/change-password", formData)
        .then((response) => {
          alert("Password changed successfully.");
        })
        .catch((error) => {
          console.error("Error changing password:", error);
          alert("Failed to change password. Please try again later.");
        });
    } else {
      console.error("Passwords do not match");
      setPasswordError("Passwords do not match");
    }
  };

  return (
    <div>
      <h3>Setting</h3>
      <div className="my-page-container">
        <div className="left-section">
          <div className="profile-picture">
            <img src={userInfo.profilePicture} alt="Profile" />
          </div>
          <div className="user-details">
            <p>Name: {userInfo.name}</p>
            <p>Birthday: {userInfo.birthday}</p>
            <p>Email: {userInfo.email}</p>
          </div>
          <div>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePictureChange}
            />
            <button className="button" onClick={handleEditProfilePicturesClick}>
              Edit Profile Pictures
            </button>
          </div>
        </div>
        <div className="right-section">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="birthday">Birthday:</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={userInfo.birthday}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, birthday: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {passwordError && (
                <span className="error-message">{passwordError}</span>
              )}
            </div>
            <button className="button2" type="submit">
              Save Changes
            </button>
            <button className="button2" type="button">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
