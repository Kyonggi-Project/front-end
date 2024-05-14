import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultProfile from "../../images/profilePicture.png";
import CommentList from "../comment/CommentList1";
import { httpRequest2 } from "../../util/article";
import "./UserProfile.css";
import { useSearchParams, useParams } from "react-router-dom";
import { useAuth } from "../../util/auth";
import FollowButton from "../Follow/FollowButton.jsx";

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

  const url = process.env.REACT_APP_URL_PATH;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    }

    // 사용자 프로필 데이터 가져오기
    const fetchUserProfile = async () => {
      httpRequest2(
        "GET",
        `/api/user/profile/nickname/${nickname}`,
        null,
        (response) => {
          console.log("User profile response:", response.data);
          setUserInfo({
            ...response.data.user,
            profilePicture: "/static/images/profilePicture.png",
          });
          setWatchListData(response.data.watchList.bookmark);
        },
        (error) => {
          console.error("Error fetching user info:", error);
          if (error.response && error.response.data) {
            console.error("Server error:", error.response.data);
          }
        }
      );
    };

    // 댓글 정보 가져오기
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${url}/api/comments`, {
          params: { nickname },
          withCredentials: true,
        });
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        if (error.response && error.response.data) {
          console.error("Server error:", error.response.data);
        }
      }
    };

    fetchUserProfile();
    fetchComments();
  }, [nickname, token, url]);

  return (
    <div>
      <h3 style={{ width: "700px" }}>{userInfo.nickname}'s Profile</h3>
      <div className="user-profile-container">
        <div className="user-profile-left-section">
          <div className="user-profile-picture">
            <img src={defaultProfile} alt="Profile" />
          </div>
          <div className="user-profile-user-details">
            <p>{userInfo.nickname}</p>
          </div>
          <div className="user-profile-user-stats">
            <div className="user-profile-stat-item">
              <p>Followers</p>
              <p>{userInfo.followers}</p>
            </div>
            <div className="user-profile-stat-item">
              <p>Following</p>
              <p>{userInfo.following}</p>
            </div>
            <div className="user-profile-stat-item">
              <p>Liked</p>
              <p>{watchListData.length}</p>
            </div>
          </div>
          <div>
            <FollowButton nickname={userInfo.nickname} />
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
    </div>
  );
};

export default OtherUserProfile;
