import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

Modal.setAppElement("#root"); // 본인의 앱 루트 요소에 맞게 설정

function FollowListModal({ isOpen, onRequestClose, followList, title }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

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
    console.log("Current user:", currentUser); // 현재 로그인한 사용자의 정보를 로그로 출력합니다.
    if (currentUser && currentUser.nickname === nickname) {
      navigate(`/userprofile`); // 현재 로그인한 사용자의 프로필 페이지로 이동
    } else {
      navigate(`/userprofile/${nickname}`); // 다른 사용자의 프로필 페이지로 이동
    }
    onRequestClose(); // 모달을 닫습니다.
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>{title}</h2>
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {followList.map((user, index) => (
          <li
            key={index}
            style={{
              padding: "8px 0",
              cursor: "pointer",
            }}
            onClick={() => handleUserClick(user.nickname)}
          >
            {user.nickname}
          </li>
        ))}
      </ul>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default FollowListModal;
