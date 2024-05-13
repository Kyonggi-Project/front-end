import React, { useState } from "react";
import "./ReplyModal.css";
import axios from "axios";
const ReplyModal = ({ closeModal }) => {
  const [reply, setReply] = useState("");
  const [articleId, setArticleId] = useState('');
  const [userId, setUserId] = useState('');
  const url = process.env.REACT_APP_URL_PATH;

  const formdata = {
    reply: reply
  }
  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios
    .post(url+`/api/comment/addComment/${articleId}?userId=${userId}`, formdata)
    .then(() => {
      alert("댓글을 작성했습니다.");
    })
    .catch((error) => {
      alert("댓글 작성에 실패했습니다.");
      console.error("댓글 작성 실패",error);
    });

    closeModal();
  }

  return (
    <div className="reply-wrap-modal">
      <div className="reply-modal-box">
        <button type="button" className="reply-modal-close-button" onClick={closeModal}>
          X
        </button>
        <h2 className="reply-modal-main-title">
          <p>댓글을 작성해 주세요</p>
        </h2>
        <form className="reply-input-group" onSubmit={handleSubmitForm}>
          <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} />
          <button className="reply-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReplyModal;
