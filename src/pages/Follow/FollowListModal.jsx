// components/FollowListModal.jsx
import React from "react";
import Modal from "react-modal";

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
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>{title}</h2>
      <ul>
        {followList.map((user) => (
          <li>{user.nickname}</li>
        ))}
      </ul>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default FollowListModal;
