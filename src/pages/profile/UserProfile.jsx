// UserProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import EditModal from "../profile/EditModal";
import defaultProfile from "../../images/profilePicture.png";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    // profilePicture: "/static/images/profilePicture.png", // 경로 수정
    name: "Name",
    followers: 0,
    following: 0,
    likedWorks: 0,
  });
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [updatedInfo, setUpdatedInfo] = useState({
    name: "",
    nickname: "",
    password: "",
    birthday: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/userinfo")
      .then((response) => {
        // 백엔드로부터 받은 데이터를 사용하되, profilePicture 경로는 서버 설정에 맞게 고정
        setUserInfo({
          ...response.data,
          profilePicture: "/static/images/profilePicture.png", // 서버의 정적 경로 사용
        });
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });

    // 백엔드로부터 사용자의 코멘트 가져오기
    axios
      .get("http://localhost:8080/api/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  // 모달 표시 함수
  const handleEditProfileClick = () => {
    console.log("Edit profile button clicked");
    setShowModal(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };

// 수정된 정보를 백엔드로 전송하는 함수
const handleSubmitUpdatedInfo = (updatedInfo) => {
  axios
    .put("http://localhost:8080/api/userinfo", updatedInfo)
    .then((response) => {
      console.log("Updated info sent to server:", response.data);
      // 백엔드로부터 받은 새로운 사용자 정보로 상태 업데이트
      setUserInfo(prevState => ({
        ...prevState,
        ...response.data,
      }));
      handleCloseModal(); // 모달 닫기
    })
    .catch((error) => {
      console.error("Error sending updated info to server:", error);
    });
};


  return (
    <div>
      <h3>Settings</h3>
      <div className="my-page-container">
        <div className="left-section">
          <div className="profile-picture">
            <img src={defaultProfile} alt="Profile" />
          </div>
          <div className="user-details">
            <p>{userInfo.name}</p>
          </div>
          <div className="user-stats">
            <div className="stat-item">
              <p>Followers</p>
              <p>{userInfo.followers}</p>
            </div>
            <div className="stat-item">
              <p>Following</p>
              <p>{userInfo.following}</p>
            </div>
            <div className="stat-item">
              <p>Liked</p>
              <p>{userInfo.likedWorks}</p>
            </div>
          </div>

          <div>
            <button className="info-button" onClick={handleEditProfileClick}>
              Edit Profile Information
            </button>
          </div>
        </div>
        <div className="right-section">
          <h4>Comments</h4>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        </div>
      </div>
      {showModal && (
        <EditModal
          userInfo={userInfo}
          closeModal={handleCloseModal}
          onSubmit={handleSubmitUpdatedInfo}
          setUpdatedInfo={setUpdatedInfo}
          showModal={showModal} // showModal 상태를 EditModal에 전달
        />
      )}
    </div>
  );
};

export default UserProfile;
