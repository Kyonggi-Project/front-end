import React, { useState } from "react";
import "./EditModal.css"; // EditModal.css 파일에 위의 CSS를 복사하여 붙여넣어주세요

const EditModal = ({ userInfo, closeModal, onSubmit }) => {
  const [name, setName] = useState(userInfo.name || "");
  const [nickname, setNickname] = useState(userInfo.nickname || "");
  const [password, setPassword] = useState(userInfo.password || "");
  const [confirmPassword, setConfirmPassword] = useState(userInfo.password || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, nickname, password, confirmPassword });
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button type="button" className="close-button" onClick={closeModal}>
          X
        </button>
        <h2>Edit Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickname">Nickname:</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="edit-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
