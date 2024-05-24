import React, { useState, useEffect } from "react";
import axios from "axios";
import "../profile/UserProfile.css";

const FollowButton = ({
  nickname,
  isFollowing: initialIsFollowing,
  updateFollowStatus,
  isModal = false, // 기본값은 false로 설정
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
    console.log("FollowButton initialIsFollowing updated:", initialIsFollowing);
  }, [initialIsFollowing]);

  const handleFollowToggle = () => {
    const url = `${process.env.REACT_APP_URL_PATH}/api/follow/following/${nickname}`;

    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        const newIsFollowing = !isFollowing;
        setIsFollowing(newIsFollowing);
        updateFollowStatus(nickname, newIsFollowing);
      })
      .catch((error) => {
        console.error("Error following/unfollowing user:", error);
      });
  };

  return (
    <button
      className={`other-user-profile-follow-button ${
        isModal ? "modal-style" : ""
      }`}
      onClick={handleFollowToggle}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
