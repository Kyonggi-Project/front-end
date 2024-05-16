import React, { useState } from "react";
import axios from "axios";
import "./EditModal.css";

const DeleteModal = ({ closeModal }) => {
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmPassword, setDeleteConfirmPassword] = useState("");

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    if (deletePassword !== deleteConfirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL_PATH}/api/user/delete`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
          data: { password: deletePassword },
        }
      );
      if (response.status === 200) {
        alert("회원 탈퇴가 완료되었습니다.");
        window.location.href = "/#";
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
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
        <h2>Confirm Delete Account</h2>
        <form onSubmit={handleDeleteSubmit}>
          <div className="profile-edit-form-group">
            <label htmlFor="eidt_password">Password:</label>
            <input
              type="password"
              id="edit_password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
          </div>
          <div className="profile-edit-form-group">
            <label htmlFor="edit_confirm_password">Confirm Password:</label>
            <input
              type="password"
              id="edit_confirm_password"
              value={deleteConfirmPassword}
              onChange={(e) => setDeleteConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="profile-edit-button">
            탈퇴하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
