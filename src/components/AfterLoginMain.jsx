import React, { useState, useEffect} from "react";
import "./Main.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const url = process.env.REACT_APP_URL_PATH;

function AfterLoginMain() {
  const [movieEmotionList, setMovieEmotionList] = useState([{
    id: "",
    posterImg: "",
    title: "",
    year: "",
    score: 0,
  }]); //받아온 무비데이터 저장하는 state

  const [movieClaimList, setMovieClaimList] = useState([{
    id: "",
    posterImg: "",
    title: "",
    year: "",
    score: 0,
  }]); //받아온 무비데이터 저장하는 state

  const [startIndex, setStartIndex] = useState(0); // 보여질 이미지 수 상태
  const [showIndex, setShowIndex] = useState(4);

  const [recstartIndex, setRecstartIndex] = useState(0);
  const [recshowIndex, setRecshowIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const emotion = params.get("emotion");
    const claim = params.get("claim");

    axios
      .post(url + `/api/ottdata/sentiment`, {
        emotion: `${emotion}`,
        claim: `${claim}`
      })
      .then((response) => {
        setMovieEmotionList(response.data.contentsByEmotion);
        setMovieClaimList(response.data.contentsByClaim);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      })
      .finally(() => {
        setIsLoading(false); // API 호출 완료 후 로딩 상태를 false로 설정
      });
  }, [location.search]);

  const adjustNumImagesToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1600) {
      setShowIndex(6);
      setRecshowIndex(6);
    } else if (screenWidth > 1100) {
      setShowIndex(5);
      setRecshowIndex(5);
    } else if (screenWidth > 900) {
      setShowIndex(4);
      setRecshowIndex(4);
    } else {
      setShowIndex(3);
      setRecshowIndex(3);
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
    setStartIndex(newStartIndex >= movieEmotionList.length ? 0 : newStartIndex);
  };

  const handleNextButtonClick = () => {
    const newStartIndex = startIndex + showIndex; // 4개씩 보여주므로 4을 더해줍니다.
    setStartIndex(newStartIndex >= movieEmotionList.length ? 0 : newStartIndex);
  };

  const handleRecPrevButtonClick = () => {
    const newStartIndex = recstartIndex - recshowIndex;
    setRecstartIndex(newStartIndex >= movieClaimList.length ? 0 : newStartIndex);
  };

  const handleRecNextButtonClick = () => {
    const newStartIndex = recstartIndex + recshowIndex; // 4개씩 보여주므로 4을 더해줍니다.
    setRecstartIndex(newStartIndex >= movieClaimList.length ? 0 : newStartIndex);
  };

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  return (
    <>
      {isLoading ? (<div className="main-loading-background"><div class="main-loading-spinner"></div></div>):(<>
        <div className="main-gallery-container">
        <div className="main-image-list-container">
          <h2 className="main-h1-name">지금 감정에 맞는 영화를 추천드려요!</h2>
          <ul className="main-image-list">
            {/* 이미지 배열을 map 함수를 사용하여 동적으로 렌더링 */}
            {movieEmotionList
              .slice(startIndex, startIndex + showIndex)
              .map((image, index) => (
                <li key={index}>
                    <div className="main-image-wrapper1">
                      <a href={`/details/${image.id}`}>
                        <img
                          src={image.posterImg}
                          alt={`Image ${startIndex + index + 1}`}
                        />
                      </a>
                    </div>
                    <div className="main-data-info">{truncateText(image.title, 14)}</div>
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
      </div>

      <div className="main-gallery-container">
        <div className="main-image-list-container">
          <h2 className="main-h1-name">이런 분위기의 영화는 어떠세요?</h2>
          <ul className="main-image-list">
            {/* 이미지 배열을 map 함수를 사용하여 동적으로 렌더링 */}
            {movieClaimList
              .slice(recstartIndex, recstartIndex + recshowIndex)
              .map((image, index) => (
                <li key={index}>
                    <div className="main-image-wrapper1">
                      <a href={`/details/${image.id}`}>
                        <img
                          src={image.posterImg}
                          alt={`Image ${recstartIndex + index + 1}`}
                        />
                      </a>
                    </div>
                    <div className="main-data-info">{truncateText(image.title, 14)}</div>
                    <div className="main-data-count">
                      {image.year} - <b>★ {image.score}</b>
                    </div>
                </li>
              ))}
          </ul>
          <button
            className={`main-scroll-button prev ${
              recstartIndex === 0 ? "hidden" : ""
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
      </div>
      </>)}
    </>
  );
}

export default AfterLoginMain;
