import React from "react";
import "./RecommendModal.css";

const ReModal = ({ closeModal }) => {
  return (
    <div className="wrap-modal">
      <div className="modal-box">
        <button type="button" className="modal-close-button" onClick={closeModal}>
          X
        </button>
        <h2 className="modal-main-title">
          <p>오늘 기분이 어떠신가요? 🧐</p>
          <p>감정을 입력해주시면 어울리는 작품을 추천해드릴게요!</p>
        </h2>
        <form className="input-group">
          <input type="text" />
          <button className="feeling-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReModal;
