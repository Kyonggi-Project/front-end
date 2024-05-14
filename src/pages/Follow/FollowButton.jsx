import React, { useState, useEffect } from "react";
import axios from "axios";
import "../profile/UserProfile.css";

const FollowButton = ({ nickname }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_PATH}/api/follow/following/${nickname}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.status === 200) {
        setIsFollowing(!isFollowing);
      } else {
        console.error("Failed to toggle follow");
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <button className="other-user-profile-follow-button" onClick={toggleFollow}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
