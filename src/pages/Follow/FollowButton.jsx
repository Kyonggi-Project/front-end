import React, { useState, useEffect } from "react";
import axios from "axios";
import "../profile/UserProfile.css";

const FollowButton = ({
  nickname,
  isFollowing: initialIsFollowing,
  followers,
  updateFollowers,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  // initialIsFollowing 값이 변경될 때마다 isFollowing 상태를 업데이트
  useEffect(() => {
    setIsFollowing(initialIsFollowing);
    console.log("FollowButton initialIsFollowing updated:", initialIsFollowing); // initialIsFollowing 값을 출력
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
        setIsFollowing(!isFollowing);
        // 팔로워 수 업데이트
        const newFollowers = isFollowing ? followers - 1 : followers + 1;
        updateFollowers(newFollowers);
      })
      .catch((error) => {
        console.error("Error following/unfollowing user:", error);
      });
  };

  return (
    <button
      className="other-user-profile-follow-button"
      onClick={handleFollowToggle}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
