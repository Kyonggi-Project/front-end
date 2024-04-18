import { useState } from "react";
import StarRating from "./stars/Star";
import CommentList from "../pages/comment/CommentList1.jsx";
import './MovieDetail.css'
import pamyo from '../images/pamyo.jpg';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../util/auth';

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
      <div className="movie_img">
        <img src={pamyo} alt="" className="movie_img2"/>
        <div className="overlay">
          <p className="title">영화 제목</p>
          <p className="release_date">출시 년도</p>
          <p className="time">런타임</p>
        </div>
      </div>
      <div className="all">
        <section className="section1">
          <img src={pamyo} alt="포스터" className="poster" />
        </section>
        <section className="section3">
          <div className="section2">
            <div>
              <StarRating />
              <label className="r">평가하기</label>
            </div>
            <div className="avg_rating">
              <p className="rating_num">{4.5}</p>
              <label className="rating_count">평균 평점</label>
            </div>
          </div>
          <div className="separator"></div>
          <div className="button2_box">
            <button className="buttons_icon" onClick={handleWatchlist}>watchlist 추가</button>
            <hr className='separator2' />
            <button className="buttons_icon" onClick={handleAddComment}>코멘트 추가</button>
          </div>
          <div className="separator"></div>
          <div className="movie_details">줄거리</div>
        </section>
      </div>
      <div className="separator" style={{ marginTop: '3rem', width: '100%' }}></div>
      <section className="list">
        <header className="comment">Comment</header>
        <CommentList />
      </section>
    </div>
  );
}