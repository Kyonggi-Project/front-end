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
  data: JsonData.movie[index], // 이미지 순서에 맞는 JSON 데이터를 가져옴
}));

function Main() {
  const [startIndex, setStartIndex] = useState(0); // 보여질 이미지 수 상태
  const [showIndex, setShowIndex] = useState(4);
  const [showModal, setShowModal] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState("인기");

  // 장르별 순위 변화 함수
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

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
    } else if (screenWidth > 1100) {
      setShowIndex(3);
    } else if (screenWidth > 900) {
      setShowIndex(2);
    } else {
      setShowIndex(1);
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

  return (
    <>
      <div className="main-title-page">
        <h1>Recommend for you!</h1>
        <h2>자신만의 작품을 추천받아보세요!</h2>
        <div className="main-recommend-buttonbox">
          <button className="main-recommend-button" onClick={handleModalClick}>추천받기</button>
        </div>
      </div>
      <div className="main-gallery-container">
        <div className="main-image-list-container">
        <ul className="main-button-list">
          <li><button className={`button ${selectedGenre === "인기" ? "main-selected" : ""}`} onClick={() => handleGenreClick("인기")}>인기</button></li>
          <li><button className={`button ${selectedGenre === "액션" ? "main-selected" : ""}`} onClick={() => handleGenreClick("액션")}>액션</button></li>
          <li><button className={`button ${selectedGenre === "공포" ? "main-selected" : ""}`} onClick={() => handleGenreClick("공포")}>공포</button></li>
          <li><button className={`button ${selectedGenre === "가족" ? "main-selected" : ""}`} onClick={() => handleGenreClick("가족")}>가족</button></li>
          <li><button className={`button ${selectedGenre === "드라마" ? "main-selected" : ""}`} onClick={() => handleGenreClick("드라마")}>드라마</button></li>
          <li><button className={`button ${selectedGenre === "코미디" ? "main-selected" : ""}`} onClick={() => handleGenreClick("코미디")}>코미디</button></li>
          <li><button className={`button ${selectedGenre === "SF" ? "main-selected" : ""}`} onClick={() => handleGenreClick("SF")}>SF</button></li>
          <li><button className={`button ${selectedGenre === "로맨스" ? "main-selected" : ""}`} onClick={() => handleGenreClick("로맨스")}>로맨스</button></li>
          <li><button className={`button ${selectedGenre === "다큐" ? "main-selected" : ""}`} onClick={() => handleGenreClick("다큐")}>다큐</button></li>
        </ul>
          <h1 className="main-h1-name">{selectedGenre === "인기" ? "이번주 인기작 Top 10" : `이번주 ${selectedGenre} Top 10`}</h1>
          <ul className="main-image-list">
            {/* 이미지 배열을 map 함수를 사용하여 동적으로 렌더링 */}
            {(selectedGenre === "인기" ? matchedData : filterByGenre(matchedData, selectedGenre))
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
        {showModal && (
          <RecommendModal showModal={showModal} closeModal={handleCloseModal} />
        )}
      </div>
    </>
  );
}

export default Main;
