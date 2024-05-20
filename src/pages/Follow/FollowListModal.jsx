import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FollowButton from "../Follow/FollowButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    maxHeight: "80%",
    overflow: "auto",
  },
};

Modal.setAppElement("#root");

function FollowListModal({ isOpen, onRequestClose, followList, title }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(followList);
  }, [followList]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios
        .get(`${process.env.REACT_APP_URL_PATH}/api/user/profile/myPage`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCurrentUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching current user info:", error);
        });
    }
  }, []);

  const handleUserClick = (nickname) => {
    if (currentUser && currentUser.nickname === nickname) {
      navigate(`/userprofile`);
    } else {
      navigate(`/userprofile/${nickname}`);
    }
    onRequestClose();
  };

  const updateFollowStatus = (nickname, isFollowing) => {
    setList((prevList) =>
      prevList.map((user) =>
        user.nickname === nickname ? { ...user, followed: isFollowing } : user
      )
    );
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>{title}</h2>
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {list.map((user, index) => (
          <li
            key={index}
            style={{
              padding: "8px 0",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              onClick={() => handleUserClick(user.nickname)}
              style={{ flex: 1, marginRight: "10px" }}
            >
              {user.nickname}
            </span>
            {currentUser && currentUser.nickname !== user.nickname && (
              <FollowButton
                nickname={user.nickname}
                isFollowing={user.followed}
                updateFollowStatus={updateFollowStatus}
                isModal={true} // 모달 내부 버튼임을 표시
              />
            )}
          </li>
        ))}
      </ul>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default FollowListModal;
