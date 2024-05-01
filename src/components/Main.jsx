import React, { useState, useEffect, useRef } from "react";
import Pamyo from "../images/pamyo.jpg";
import Spyfamily from "../images/spyfamily.jpg";
import Dune from "../images/dune.jpg";
import Malo from "../images/malo.jpg";
import Mukspark from "../images/mukspark.jpg";
import Concert from "../images/concert.jpg";
import Whatslove from "../images/whatslove.jpg";
import JsonData from "./movie.json";
import RecommendModal from "./RecommendModal";
import "./Main.css"

const imagePaths = [Pamyo, Spyfamily, Dune, Malo, Mukspark, Concert, Whatslove];
const matchedData = imagePaths.map((imagePath, index) => ({
  imagePath: imagePath,
  data: JsonData[index], // 이미지 순서에 맞는 JSON 데이터를 가져옴
}));

function Main() {
  const [startIndex, setStartIndex] = useState(0); // 보여질 이미지 수 상태
  const [showIndex, setShowIndex] = useState(4);

  const [recstartIndex, setRecstartIndex] = useState(0);
  const [recshowIndex, setRecshowIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);

  // 모달 표시 함수
  const handleModalClick = () => {
    console.log("Edit profile button clicked");
    setShowModal(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const adjustNumImagesToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1600) {
      setShowIndex(4);
      setRecshowIndex(6);
    } else if (screenWidth > 1100) {
      setShowIndex(3);
      setRecshowIndex(4);
    } else if (screenWidth > 900) {
      setShowIndex(2);
      setRecshowIndex(2);
    } else {
      setShowIndex(1);
      setRecshowIndex(1);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때마다 실행
    adjustNumImagesToShow();
    window.addEventListener("resize", adjustNumImagesToShow);
    return () => {
      window.removeEventListener("resize", adjustNumImagesToShow);
    };
  }, []);

  const handlePrevButtonClick = () => {
    const newStartIndex = startIndex - showIndex;
    setStartIndex(newStartIndex >= imagePaths.length ? 0 : newStartIndex);
  };

  const handleNextButtonClick = () => {
    const newStartIndex = startIndex + showIndex; // 4개씩 보여주므로 4을 더해줍니다.
    setStartIndex(newStartIndex >= imagePaths.length ? 0 : newStartIndex);
  };

  const handleRecPrevButtonClick = () => {
    const newStartIndex = recstartIndex - recshowIndex;
    setRecstartIndex(newStartIndex >= imagePaths.length ? 0 : newStartIndex);
  };

  const handleRecNextButtonClick = () => {
    const newStartIndex = recstartIndex + recshowIndex; // 4개씩 보여주므로 4을 더해줍니다.
    setRecstartIndex(newStartIndex >= imagePaths.length ? 0 : newStartIndex);
  };

  return (
    <>
      <div className="main-title-page">
        <h1>Recommend for you!</h1>
        <h2>자신만의 작품을 추천받아보세요!</h2>
        <div className="main-recommend-buttonbox">
          <button className="main-recommend-button" onClick={handleModalClick}>추천 받기</button>
        </div>
      </div>
      <div className="main-gallery-container">
        <div className="main-image-list-container">
          <h1 className="main-h1-name">Ranking</h1>
          <ul className="main-image-list">
            {/* 이미지 배열을 map 함수를 사용하여 동적으로 렌더링 */}
            {matchedData
              .slice(startIndex, startIndex + showIndex)
              .map((image, index) => (
                <li key={index}>
                  <a href="#">
                    <div className="main-image-wrapper">
                      <span className="main-image-number">
                        {startIndex + index + 1}
                      </span>
                      <a href={`/details?index=${index}`}>
                        <img
                          src={image.imagePath}
                          alt={`Image ${startIndex + index + 1}`}
                        />
                      </a>
                    </div>
                    <div className="main-data-info">{image.data.title}</div>
                    <div className="main-data-count">
                      {image.data.date} - {image.data.count}만명
                    </div>
                  </a>
                </li>
              ))}
          </ul>
          <button
            className={`main-scroll-button prev ${startIndex === 0 ? "h1" : ""}`}
            onClick={handlePrevButtonClick}
          >
            ←
          </button>
          <button
            className="main-scroll-button next"
            onClick={handleNextButtonClick}
          >
            →
          </button>
        </div>
      </div>

      <div className="main-gallery-container">
        <div className="main-image-list-container">
          <h2 className="main-h2-name">Recommend for you</h2>
          <p className="main-name-description"> 작성해주신 내용을 토대로 추천해드릴게요!</p>
          <ul className="main-image-list">
            {/* 이미지 배열을 map 함수를 사용하여 동적으로 렌더링 */}
            {matchedData
              .slice(recstartIndex, recstartIndex + recshowIndex)
              .map((image, index) => (
                <li key={index}>
                  <a href="#">
                    <div className="main-image-wrapper1">
                      <a href={`/details?index=${index}`}>
                        <img
                          src={image.imagePath}
                          alt={`Image ${recstartIndex + index + 1}`}
                        />
                      </a>
                    </div>
                    <div className="main-data-info">{image.data.title}</div>
                    <div className="main-data-count">
                      {image.data.date} - {image.data.count}만명
                    </div>
                  </a>
                </li>
              ))}
          </ul>
          <button
            className={`main-scroll-button prev ${
              recstartIndex === 0 ? "h1" : ""
            }`}
            onClick={handleRecPrevButtonClick}
          >
            ←
          </button>
          <button
            className="main-scroll-button next"
            onClick={handleRecNextButtonClick}
          >
            →
          </button>
        </div>
        {showModal && (
          <RecommendModal showModal={showModal} closeModal={handleCloseModal} />
        )}
      </div>
    </>
  );
}

export default Main;
