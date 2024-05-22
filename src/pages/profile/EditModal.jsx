import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ userInfo, closeModal, onSubmit, showDeleteModal }) => {
  const [nickname, setNickname] = useState(userInfo.nickname || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ nickname, password, confirmPassword });
    closeModal();
  };

  return (
    <div className="profile-edit-modal">
      <div className="profile-edit-modal-content">
        <button
          type="button"
          className="profile-edit-close-button"
          onClick={closeModal}
        >
          X
        </button>
        <h2>Edit Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="profile-edit-form-group">
            <label htmlFor="nickname">Nickname:</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="profile-edit-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="profile-edit-form-group">
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="profile-edit-button">
            Save Changes
          </button>
        </form>
        <button
          type="button"
          className="profile-delete-button"
          onClick={showDeleteModal}
        >
          회원 탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default EditModal;
