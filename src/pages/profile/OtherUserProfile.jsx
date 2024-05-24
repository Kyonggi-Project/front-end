import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultProfile from "../../images/profilePicture.png";
import CommentList from "../comment/CommentList1";
import { httpRequest2 } from "../../util/article";
import "./UserProfile.css";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import FollowButton from "../Follow/FollowButton.jsx";
import FollowListModal from "../Follow/FollowListModal.jsx";

const OtherUserProfile = () => {
  // const [userInfo, setUserInfo] = useState({
  //   nickname: "",
  //   followers: 0,
  //   following: 0,
  //   likedWorks: 0,
  // });
  const [comments, setComments] = useState([]);
  const [watchListData, setWatchListData] = useState([]);
  const { nickname } = useParams(); // URL에서 nickname 파라미터를 가져옴
  const [isFollowed, setIsFollowed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const url = process.env.REACT_APP_URL_PATH;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  if (token) {
    localStorage.setItem("access_token", token);
  }

  useEffect(() => {
    // 현재 로그인한 사용자 정보를 가져옴
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${url}/api/user/profile/myPage`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error("Error fetching current user info:", error);
      }
    };

    fetchCurrentUser();
  }, [url]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.nickname === nickname) {
        // 현재 로그인한 사용자의 프로필 페이지로 접근 시 마이페이지로 리다이렉트
        navigate("/userprofile");
      } else {
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

        // Comments 가져오는 부분
        httpRequest2(
          "GET",
          `/api/ottReview/reviews/otherUser/${nickname}`,
          null,
          (response) => {
            setComments(response.data);
          },
          (error) => {
            console.error("Error fetching comments:", error);
          }
        );
      }
    }
  }, [nickname, currentUser, navigate]);

  // 팔로워 목록을 가져오는 함수
  const fetchFollowers = () => {
    httpRequest2(
      "GET",
      `/api/user/follower/${userData.nickname}`,
      null,
      (response) => {
        setFollowers(response.data);
        setShowFollowersModal(true);
      },
      (error) => {
        console.error("Error fetching followers:", error);
      }
    );
  };

  const fetchFollowing = () => {
    httpRequest2(
      "GET",
      `/api/user/following/${userData.nickname}`,
      null,
      (response) => {
        setFollowing(response.data);
        setShowFollowingModal(true);
      },
      (error) => {
        console.error("Error fetching followers:", error);
      }
    );
  };

  const updateFollowStatus = (nickname, newIsFollowing) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      followers: newIsFollowing
        ? prevUserData.followers + 1
        : prevUserData.followers - 1,
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
              updateFollowStatus={updateFollowStatus}
            />
          </div>
        </div>
        <div className="user-profile-right-section">
          <h4>Comments</h4>
          <div>
            <CommentList
              comments={comments}
              nickname={nickname}
              pageType="UserProfile"
            />
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
