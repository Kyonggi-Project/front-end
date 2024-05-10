// UserProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "../profile/EditModal";
import defaultProfile from "../../images/profilePicture.png";
import CommentList from "../comment/CommentList1";
import { httpRequest2 } from "../../util/article";
import "./UserProfile.css";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../util/auth";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: "Name",
    followers: 0,
    following: 0,
    likedWorks: 0,
  });
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState([]);
  const [watchListData, setWatchListData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const url = process.env.REACT_APP_URL_PATH;
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  if (token) {
    localStorage.setItem('access_token', token);
  }

  const nickname = userInfo.nickname; // 예시로 userInfo의 nickname을 사용
  useEffect(() => {
    httpRequest2(
      'GET',
      '/api/user/profile/myPage',
      null,
      (response) => {
        setUserData(response.data.user);
        setWatchListData(response.data.watchList.bookmark);
      },
      (error) => {
        console.error("Error fetching user info:", error);
        // 리프레시 토큰을 이용한 액세스 토큰 재발급 등의 작업을 수행할 수 있습니다.
      }
    );

    axios
      .get(url + `/api/user/profile/nickname/${nickname}`, {
        withCredentials: true,
      })
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
      .get(url + "/api/comments")
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
    // confirmPassword는 백엔드로 전송하지 않음
    const { confirmPassword, ...infoToSend } = updatedInfo;
    if (infoToSend.password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    axios
      .put(url + "/api/user/update", infoToSend)
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
      <div className="user-profile-container">
        <div className="user-profile-left-section">
          <div className="user-profile-picture">
            <img src={defaultProfile} alt="Profile" />
          </div>
          <div className="user-profile-user-details">
            <p>{userData.nickname}</p>
          </div>
          <div className="user-profile-user-stats">
            <div className="user-profile-stat-item">
              <p>Followers</p>
              <p>{userData.followers}</p>
            </div>
            <div className="user-profile-stat-item">
              <p>Following</p>
              <p>{userData.following}</p>
            </div>
            <div className="user-profile-stat-item">
              <p>Liked</p>
              <p>{watchListData.length}</p>
            </div>
          </div>

          <div>
            <button className="user-profile-info-button" onClick={handleEditProfileClick}>
              Edit Profile Information
            </button>
          </div>
        </div>
        <div className="user-profile-right-section">
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
