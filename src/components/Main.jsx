import React, { useState, useEffect, useRef } from "react";
import RecommendModal from "./RecommendModal";
import "./Main.css"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const url = 'http://localhost:8080';
let belowpage = '/api/ottdata/top10';

function Main() {
  const [startIndex, setStartIndex] = useState(0); // 몇번째 이미지 인덱스부터 출력하는지
  const [showIndex, setShowIndex] = useState(5); // 보여주는 이미지 수
  const [showModal, setShowModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("인기"); //장르값 저장하는 state

  const navigate = useNavigate();
  const location = useLocation();
  
  const [movieList, setMovieList] = useState([{
    id: "",
    posterImg: "",
    title: "",
    year: "",
    score: 0,
  }]); //받아온 무비데이터 저장하는 state

  //백엔드에서 데이터 받아오는 코드
  useEffect(()=> {
    const params = new URLSearchParams(location.search);
    const genreParam = params.get("genre");
    
    if (genreParam) {
      belowpage=`/api/ottdata/genre?genre=${genreParam}`; //장르데이터 존재시 장르리스트 받아오도록
    }
    else{
      belowpage = '/api/ottdata/top10'; //장르데이터가 없으면 인기리스트 받아오도록
    }
    axios.get(url+belowpage)
      .then(response => {
        setMovieList(response.data); //받아온 데이터를 무비리스트에 배열형태로 저장
      })
      .catch(
        error => {console.error("Error fetching movie data", error);
      });
  },[location.search, selectedGenre]);

  //URL파라미터에서 genre값 존재 시 해당 값을 seletedGenre에 저장, 값이 없으면 '인기'로 저장
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreParam = params.get("genre");
    setSelectedGenre(genreParam || "인기");
  }, [location]);

  // 장르별 순위 변화 함수, 장르가 인기면 / 경로로, 장르가 있으면 /genre=[장르]로 이동
  const handleGenreClick = (genre) => {
    if (genre === "인기") {
      navigate(`/`);
    } else {
      navigate(`/?genre=${genre}`);
    }
    setStartIndex(0);
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

  //화면 사이즈에 따라 보여주는 이미지 수를 변경
  const adjustNumImagesToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1280) {
      setShowIndex(5);
    } else if (screenWidth > 1100) {
      setShowIndex(4);
    } else if (screenWidth > 900) {
      setShowIndex(3);
    } else {
      setShowIndex(2);
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

  //왼쪽으로 가는 버튼함수 현재 위치에서 보여주는 인덱스 번호만큼 뺀다
  const handlePrevButtonClick = () => {
    const newStartIndex = startIndex - showIndex;
    setStartIndex(newStartIndex >= movieList.length ? 0 : newStartIndex);
  };

  //오른쪽으로 가는 버튼함수 현재 위치에서 보여주는 인덱스 번호만큼 더한다
  const handleNextButtonClick = () => {
    const newStartIndex = startIndex + showIndex;
    setStartIndex(newStartIndex >= movieList.length ? 0 : newStartIndex);
  };

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }  

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
        <ul className="main-button-list">
          <li><button className={`main-button ${selectedGenre === "인기" ? "main-selected" : ""}`} onClick={() => handleGenreClick("인기")}>인기</button></li>
          <li><button className={`main-button ${selectedGenre === "액션" ? "main-selected" : ""}`} onClick={() => handleGenreClick("액션")}>액션</button></li>
          <li><button className={`main-button ${selectedGenre === "공포" ? "main-selected" : ""}`} onClick={() => handleGenreClick("공포")}>공포</button></li>
          <li><button className={`main-button ${selectedGenre === "가족" ? "main-selected" : ""}`} onClick={() => handleGenreClick("가족")}>가족</button></li>
          <li><button className={`main-button ${selectedGenre === "드라마" ? "main-selected" : ""}`} onClick={() => handleGenreClick("드라마")}>드라마</button></li>
          <li><button className={`main-button ${selectedGenre === "코미디" ? "main-selected" : ""}`} onClick={() => handleGenreClick("코미디")}>코미디</button></li>
          <li><button className={`main-button ${selectedGenre === "SF" ? "main-selected" : ""}`} onClick={() => handleGenreClick("SF")}>SF</button></li>
          <li><button className={`main-button ${selectedGenre === "로맨스" ? "main-selected" : ""}`} onClick={() => handleGenreClick("로맨스")}>로맨스</button></li>
          <li><button className={`main-button ${selectedGenre === "다큐" ? "main-selected" : ""}`} onClick={() => handleGenreClick("다큐")}>다큐</button></li>
        </ul>
          <h2 className="main-h1-name">{selectedGenre === "인기" ? "이번주 인기작 Top 10" : `${selectedGenre}`}</h2>
          <ul className="main-image-list">
            {/* 이미지 배열을 map 함수를 사용하여 동적으로 렌더링 */}
            {movieList
              .slice(startIndex, startIndex + showIndex)
              .map((image, index) => (
                <li key={index}>
                    <div className="main-image-wrapper">
                      <span className="main-image-number">
                        {startIndex + index + 1}
                      </span>
                      <a href={`/details/${image.id}`}>
                        <img
                          src={image.posterImg}
                          alt={`Image ${startIndex + index + 1}`}
                        />
                      </a>
                    </div>
                    <div className="main-data-info">{truncateText(image.title, 19)}</div>
                    <div className="main-data-count">
                      {image.year} - <b>★ {image.score}</b>
                    </div>
                </li>
              ))}
          </ul>
          <button
            className={`main-scroll-button prev ${startIndex === 0 ? "hidden" : ""}`}
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
      <a href="/chat"><div className="main-chatroom">대화방</div></a>
    </>
  );
}

export default Main;
