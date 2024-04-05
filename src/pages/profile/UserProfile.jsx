// UserProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import EditModal from "../profile/EditModal";
import defaultProfile from "../../images/profilePicture.png";
import CommentApp from "../CommentList/CommentList";
import CommentList from "../comment/CommentList1";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: "Name",
    followers: 0,
    following: 0,
    likedWorks: 0,
  });
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const nickname = userInfo.nickname; // 예시로 userInfo의 nickname을 사용

  useEffect(() => {
    // 유저 정보 가져오기 엔드포인트 수정
    axios
      .get(`http://localhost:8080/api/user/profile/nickname/${nickname}`)
      .then((response) => {
        setUserInfo({
          ...response.data,
          profilePicture: "/static/images/profilePicture.png",
        });
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });

    axios
      .get("http://localhost:8080/api/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [nickname]);

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
    // confirmPassword는 백엔드로 전송하지 않음
    const { confirmPassword, ...infoToSend } = updatedInfo;
    if (infoToSend.password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    axios
      .put("http://localhost:8080/api/user/update", infoToSend)
      .then((response) => {
        console.log("Updated info sent to server:", response.data);
        setUserInfo((prevState) => ({
          ...prevState,
          ...response.data,
        }));
        handleCloseModal();
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
            <p>{userInfo.nickname}</p>
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
            <div>
              <CommentList />
            </div>
          </ul>
        </div>
      </div>
      {showModal && (
        <EditModal
          userInfo={userInfo}
          closeModal={handleCloseModal}
          onSubmit={handleSubmitUpdatedInfo}
          showModal={showModal} // showModal 상태를 EditModal에 전달
        />
      )}
    </div>
  );
};

export default UserProfile;
