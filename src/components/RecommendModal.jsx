import React, { useState } from "react";
import "./RecommendModal.css";

const ReModal = ({ closeModal }) => {
  const [feeling, setFeeling] = useState("");
  const [formnumber, setFormNumber] = useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFeeling("");
    setFormNumber(true);
  }

  return (
    <div className="wrap-modal">
      <div className="modal-box">
        <button type="button" className="modal-close-button" onClick={closeModal}>
          X
        </button>
        {!formnumber ? (<>
          <h2 className="modal-main-title">
            <p>오늘 기분이 어떠신가요? 🧐</p>
            <p>감정을 입력해주시면 어울리는 작품을 추천해드릴게요!</p>
          </h2>
          <form className="input-group" onSubmit={handleSubmitForm}>
            <input type="text" value={feeling} onChange={(e) => setFeeling(e.target.value)}/>
            <button className="feeling-submit">Submit</button>
          </form>
        </>)
        :(<>
          <h2 className="modal-main-title">
            <p>영화는 어디서 주로 시청하시나요? 🧐</p>
          </h2>
          <form className="input-group">
            <input type="text" value={feeling} onChange={(e) => setFeeling(e.target.value)}/>
            <button className="feeling-submit">Submit</button>
          </form>
        </>)}

      </div>
    </div>
  );
};

export default ReModal;
