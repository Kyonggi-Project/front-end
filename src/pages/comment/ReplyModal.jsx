import React, { useState } from "react";
import './ReplyModal.css';

const ReplyModal = ({ closeModal }) => {
  const [reply, setReply] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setReply("");
  }

  return (
    <div className="wrap-modal">
      <div className="modal-box">
        <button type="button" className="modal-close-button" onClick={closeModal}>
          X
        </button>
        <h2 className="modal-main-title">
          <p>댓글을 작성해 주세요</p>
        </h2>
        <form className="input-group" onSubmit={handleSubmitForm}>
          <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} />
          <button className="reply-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReplyModal;
