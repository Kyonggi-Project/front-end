import React, { useState } from "react";
import "./RecommendModal.css";
import { useNavigate } from "react-router-dom";
const ReModal = ({ closeModal }) => {
  const [feeling, setFeeling] = useState("");
  const [watchList, setWatchList] = useState("");
  const [formnumber, setFormNumber] = useState(false);

  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFeeling("");
    console.log(feeling);
    setFormNumber(true);
  };
  const handleSubmitWatchList = (e) => {
    console.log(watchList);
    setWatchList("");
    navigate(`/afterModal`);
  };

  return (
    <div className="recommend-modal-wrap-modal">
      <div className="recommendd-modal-box">
        <button
          type="button"
          className="recommend-modal-close-button"
          onClick={closeModal}
        >
          X
        </button>
        {!formnumber ? (
          <>
            <h2 className="recommend-modal-main-title">
              <p>오늘 기분이 어떠신가요? 🧐</p>
              <p>감정을 입력해주시면 어울리는 작품을 추천해드릴게요!</p>
            </h2>
            <form
              className="recommend-modal-input-group"
              onSubmit={handleSubmitForm}
            >
              <input
                type="text"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
              />
              <button className="recommend-modal-feeling-submit">Submit</button>
            </form>
          </>
        ) : (
          <>
            <h2 className="recommend-modal-main-title">
              <p>어떤 분위기의 영화를 보고 싶으신가요? 🧐</p>
            </h2>
            <form 
              className="recommend-modal-input-group"
              onSubmit={handleSubmitWatchList}  
            >
              <input
                type="text"
                value={watchList}
                onChange={(e) => setWatchList(e.target.value)}
              />
              <button className="recommend-modal-feeling-submit">Submit</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ReModal;
