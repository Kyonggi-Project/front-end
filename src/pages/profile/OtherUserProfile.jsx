import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultProfile from "../../images/profilePicture.png";
import CommentList from "../comment/CommentList1";
import { httpRequest2 } from "../../util/article";
import "./UserProfile.css";
import { useSearchParams, useParams } from "react-router-dom";
import { useAuth } from "../../util/auth";
import FollowButton from "../Follow/FollowButton.jsx";
import FollowListModal from "../Follow/FollowListModal.jsx";

const OtherUserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    followers: 0,
    following: 0,
    likedWorks: 0,
  });
  const [comments, setComments] = useState([]);
  const [watchListData, setWatchListData] = useState([]);
  const { nickname } = useParams(); // URL에서 nickname 파라미터를 가져옴
  const { user } = useAuth(); // 현재 로그인한 유저 정보
  const [isFollowed, setIsFollowed] = useState(false);
  const [userData, setUserData] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const url = process.env.REACT_APP_URL_PATH;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  if (token) {
    localStorage.setItem("access_token", token);
  }

  useEffect(() => {
    httpRequest2(
      "GET",
      `/api/user/profile/nickname/${nickname}`,
      null,
      (response) => {
        console.log("User data response:", response.data);
        setUserData(response.data.user);
        console.log("followed:", response.data.user.followed); // followed 값을 출력
        setIsFollowed(response.data.user.followed); // followed 상태 설정
        if (response.data.watchList) {
          setWatchListData(response.data.watchList.bookmark);
        }
      },
      (error) => {
        console.error("Error fetching user info:", error);
        if (error.response && error.response.status === 404) {
          alert("가입되지 않은 사용자입니다.");
          window.location.href = "/#";
        } else {
          alert("사용자 정보를 가져오는 중 오류가 발생했습니다.");
          window.location.href = "/#";
        }
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
  }, [nickname]);

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
  const updateFollowers = (newFollowers) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      followers: newFollowers,
    }));
  };

  return (
    <div>
      <h3 style={{ width: "700px" }}>{userData.nickname}'s Profile</h3>
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
            <FollowButton
              nickname={userData.nickname}
              isFollowing={isFollowed} // isFollowed 상태 전달
              followers={userData.followers} // 현재 팔로워 수 전달
              updateFollowers={updateFollowers}
            />
          </div>
        </div>
        <div className="user-profile-right-section">
          <h4>Comments</h4>
          <div>
            <CommentList commentList={comments} />
          </div>
        </div>
      </div>
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

export default OtherUserProfile;
