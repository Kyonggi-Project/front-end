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
import FollowListModal from "../Follow/FollowListModal.jsx";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    followers: 0,
    following: 0,
    likedWorks: 0,
  });
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState([]);
  const [watchListData, setWatchListData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const url = process.env.REACT_APP_URL_PATH;
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  if (token) {
    localStorage.setItem("access_token", token);
  }

  const nickname = userInfo.nickname; // 예시로 userInfo의 nickname을 사용

  useEffect(() => {
    httpRequest2(
      "GET",
      "/api/user/profile/myPage",
      null,
      (response) => {
        console.log(response.data);
        setUserData(response.data.user);
        if (response.data.watchList) {
          setWatchListData(response.data.watchList.bookmark);
        }
      },
      (error) => {
        console.error("Error fetching user info:", error);
      }
    );

    axios.get(url + "/api/comments").then(
      (response) => {
        setComments(response.data);
      },
      (error) => {
        console.error("Error fetching comments:", error);
      }
    );
  }, []);

  // 팔로워 목록을 가져오는 함수
  const fetchFollowers = () => {
    axios
      .get(`${url}/api/user/follower/${userData.nickname}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        withCredentials: true,
      })
      .then((response) => {
        setFollowers(response.data);
        setShowFollowersModal(true);
      })
      .catch((error) => {
        console.error("Error fetching followers:", error);
      });
  };

  // 팔로잉 목록을 가져오는 함수
  const fetchFollowing = () => {
    axios
      .get(`${url}/api/user/following/${userData.nickname}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        withCredentials: true,
      })
      .then((response) => {
        setFollowing(response.data);
        setShowFollowingModal(true);
      })
      .catch((error) => {
        console.error("Error fetching following:", error);
      });
  };

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
              <p onClick={fetchFollowers}>{userData.followers}</p>
            </div>
            <div className="user-profile-stat-item">
              <p>Following</p>
              <p onClick={fetchFollowing}>{userData.following}</p>
            </div>
            <div className="user-profile-stat-item">
              <p>Liked</p>
              <p>{watchListData.length}</p>
            </div>
          </div>

          <div>
            <button
              className="user-profile-info-button"
              onClick={handleEditProfileClick}
            >
              Edit Profile Information
            </button>
          </div>
        </div>
        <div className="user-profile-right-section">
          <h4>Comments</h4>
          <ul>
            <div>
              <CommentList commentList={comments} />
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
      <FollowListModal
        isOpen={showFollowersModal}
        onRequestClose={() => setShowFollowersModal(false)}
        followList={followers}
        title="Followers"
      />
      <FollowListModal
        isOpen={showFollowingModal}
        onRequestClose={() => setShowFollowingModal(false)}
        followList={following}
        title="Following"
      />
    </div>
  );
};

export default UserProfile;
