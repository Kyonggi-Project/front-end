import React, { useState, useEffect } from 'react';
import '../EditModal.css'; // 기존의 CSS 파일 재사용

const LikedMoviesModal = ({ closeModal }) => {
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    // 예시 데이터 로딩 함수
    // 실제 구현에서는 여기서 백엔드 API 호출을 통해 좋아요 누른 영화 데이터를 불러와야 합니다.
    const fetchLikedMovies = async () => {
      // 백엔드에서 좋아요 누른 영화 목록 가져오는 코드
      // 예: const response = await fetch('/api/user/likes');
      // setLikedMovies(response.data);
      
      // 임시 데이터
      setLikedMovies([
        { id: 1, title: '영화 제목 1', year: 2020 },
        { id: 2, title: '영화 제목 2', year: 2021 },
        // 더 많은 영화 데이터...
      ]);
    };

    fetchLikedMovies();
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <button type="button" className="close-button" onClick={closeModal}>
          X
        </button>
        <h2>좋아요 누른 영화 목록</h2>
        <div>
          {likedMovies.map((movie) => (
            <div key={movie.id} className="liked-movie-item">
              <p>{movie.title} ({movie.year})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikedMoviesModal;
