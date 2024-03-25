import React, { useState,useEffect, useRef } from 'react';
import './Main.css';
import Pamyo from '../images/pamyo.jpg';
import Spyfamily from '../images/spyfamily.jpg';
import Dune from '../images/dune.jpg';
import Malo from '../images/malo.jpg';
import Mukspark from '../images/mukspark.jpg';
import Concert from '../images/concert.jpg';
import Whatslove from '../images/whatslove.jpg';
import JsonData from './movie.json';

const imagePaths = [Pamyo, Spyfamily, Dune, Malo, Mukspark, Concert, Whatslove];
const matchedData = imagePaths.map((imagePath, index) => ({
  imagePath: imagePath,
  data: JsonData[index] // 이미지 순서에 맞는 JSON 데이터를 가져옴
}));

function Main() {
  const [startIndex, setStartIndex] = useState(0); // 보여질 이미지 수 상태
  const [showIndex, setShowIndex] = useState(4);

  const [recstartIndex, setRecstartIndex] = useState(0);
  const [recshowIndex, setRecshowIndex] = useState(0);

  const modalRef = useRef(null);

  const openModal = () => {
      modalRef.current.style.display = 'block';
  };

  const closeModal = () => {
      modalRef.current.style.display = 'none';
  };

  const adjustNumImagesToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1600) {
      setShowIndex(4);
      setRecshowIndex(6);
    } else if (screenWidth > 1100) {
      setShowIndex(3);
      setRecshowIndex(4);
    } else if (screenWidth > 900){
      setShowIndex(2);
      setRecshowIndex(2);
    }
    else{
      setShowIndex(1);
      setRecshowIndex(1);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때마다 실행
    adjustNumImagesToShow();
    window.addEventListener('resize', adjustNumImagesToShow);
    return () => {
      window.removeEventListener('resize', adjustNumImagesToShow);
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
      <div className='titlepage'>
        <h1>자신만의 작품을 추천받아보세요</h1>
        <div className='buttonbox'>
          <button onClick={openModal}>추천받기</button>
        </div>
      </div>
      <dialog ref={modalRef} className="modal">
          <div className="modal-content">
              <span className="close" onClick={closeModal}>close</span>
              <p>모달 내용</p>
          </div>
      </dialog>
      <div className="gallery-container">
      <div className="image-list-container">
      <h1 className='h1-name'>Ranking</h1>
        <ul className="image-list">
          {/* 이미지 배열을 map 함수를 사용하여 동적으로 렌더링 */}
          {matchedData.slice(startIndex, startIndex+showIndex).map((image, index) => (
          <li key={index}>
            <a href="#">
              <div className="image-wrapper">
                <span className="image-number">{startIndex+index+ 1}</span>
                <a href={`/details?index=${index}`}><img src={image.imagePath} alt={`Image ${startIndex + index + 1}`}/></a>
              </div>
              <div className='data-info'>{image.data.title}</div> 
              <div className='data-count'>{image.data.date} - {image.data.count}만명</div>
            </a>
          </li>
        ))}
        </ul>
        <button className={`scroll-button prev ${startIndex === 0 ? 'hidden' : ''}`} onClick={handlePrevButtonClick}>←</button>
        <button className="scroll-button next" onClick={handleNextButtonClick}>→</button>
      </div>
      </div>

      <div className="gallery-container">
      <div className="image-list-container">
      <h2 className='h2-name'>회원님에게 추천하는 작품</h2>
        <ul className="image-list">
          {/* 이미지 배열을 map 함수를 사용하여 동적으로 렌더링 */}
          {matchedData.slice(recstartIndex, recstartIndex+recshowIndex).map((image, index) => (
          <li key={index}>
            <a href="#">
              <div className="image-wrapper1"> 
                <a href={`/details?index=${index}`}><img src={image.imagePath} alt={`Image ${recstartIndex + index + 1}`} /></a>
              </div>
              <div className='data-info'>{image.data.title}</div>
              <div className='data-count'>{image.data.date} - {image.data.count}만명</div>
            </a>
          </li>
        ))}
        </ul>
        <button className={`scroll-button prev ${recstartIndex === 0 ? 'hidden' : ''}`} onClick={handleRecPrevButtonClick}>←</button>
        <button className="scroll-button next" onClick={handleRecNextButtonClick}>→</button>
      </div>
      </div>
    </>
  );
}

export default Main;