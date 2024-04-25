import { useState } from "react";
import StarRating from "./stars/Star";
import CommentList from "../pages/comment/CommentList1.jsx";
import pamyo from '../images/pamyo.jpg';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../util/auth';
import "./MovieDetail.css";

const genre = ["액션", "로맨스", "SF"];

export default function MovieDetail() {
  const navigate = useNavigate();
  const { isLogin, isloginHandler } = useAuth();

  const handleAddComment = (event) => {
    if(!isLogin) {
      isloginHandler(event);
    }
    else {
      navigate('/write');
    }
  }

  const handleWatchlist = (event) => {
    if(!isLogin) {
      isloginHandler(event);
    }
    else {

    }
  }

  return (
    <div>
      <div className="movie-detail-movie_img">
        <img src={pamyo} alt="" className="movie-detail-movie_img2"/>
        <div className="movie-detail-overlay">
          <p className="movie-detail-title">영화 제목</p>
          <p className="movie-detail-release_date">출시 년도</p>
          <p className="movie-detail-time"><a href={`/movie?genre=${genre[0]}`}>#{genre[0]}</a><a href={`/movie?genre=${genre[1]}`}>#{genre[1]}</a></p>
        </div>
      </div>
      <div className="movie-detail-all">
        <section className="movie-detail-section1">
          <img src={pamyo} alt="포스터" className="movie-detail-poster" />
        </section>
        <section className="movie-detail-section3">
          <div className="movie-detail-section2">
            <div>
              <StarRating />
              <label className="movie-detail-r">평가하기</label>
            </div>
            <div className="movie-detail-avg_rating">
              <p className="movie-detail-rating_num">{4.5}</p>
              <label className="movie-detail-rating_count">평균 평점</label>
            </div>
          </div>
          <div className="movie-detail-separator"></div>
          <div className="movie-detail-button2_box">
            <button className="movie-detail-buttons_icon" onClick={handleWatchlist}>watchlist 추가</button>
            <hr className='movie-detail-separator2' />
            <button className="movie-detail-buttons_icon" onClick={handleAddComment}>코멘트 추가</button>
          </div>
          <div className="movie-detail-separator"></div>
          <div className="movie-detail-movie_details">줄거리</div>
        </section>
      </div>
      <div className="movie-detail-separator" style={{ marginTop: '3rem', width: '100%' }}></div>
      <section className="movie-detail-list">
        <header className="movie-detail-comment">Comment</header>
        <CommentList />
      </section>
    </div>
  );
}