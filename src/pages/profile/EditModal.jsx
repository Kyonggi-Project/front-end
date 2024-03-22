import React, { useState } from "react";
import "./EditModal.css"; // EditModal.css 파일에 위의 CSS를 복사하여 붙여넣어주세요

const EditModal = ({ userInfo, closeModal, onSubmit }) => {
  const [name, setName] = useState(userInfo.name || ""); 
  const [nickname, setNickname] = useState(userInfo.nickname || "");
  const [password, setPassword] = useState(userInfo.password || "");
  const [birthday, setBirthday] = useState(userInfo.birthday || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, nickname, password, birthday });
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
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
            <label htmlFor="birthday">Birthday:</label>
            <input
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
