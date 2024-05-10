import { useEffect, useState } from "react";
import StarRating from "./stars/Star";
import CommentList from "../pages/comment/CommentList1.jsx";
import { useLocation, useNavigate } from "react-router-dom";
//import { httpRequest2 } from "../util/article.js";
import axios from "axios";
import { useAuth } from '../util/auth';
import "./MovieDetail.css";
import netflix from '../images/netflix.png';
import watcha from '../images/watcha.png';
import disney from '../images/disney.jpg';
import tving from '../images/tving.png';
import wavve from '../images/wavve.png';

const LogoImg = {'Netflix':netflix , "Watcha":watcha, "Disney":disney, "Tving":tving, "Wavve":wavve};
//let OTTimg = [];

export default function MovieDetail() {
  const navigate = useNavigate();
  const { isLogin, isloginHandler } = useAuth();
  const [ isWatchList, setIsWatchList ] = useState(false);
  let [ OTTimg, setOTTimg ] = useState([]);
  const [ movieData, setMovieData ] = useState({
    title: "title",
    year: 0,
    posterImg: "",
    backgroundImg: "",
    genreList: [
      "string"
    ],
    synopsis: "",
    score : 0,
    metaData: {
      additionalProp1: "string",
      additionalProp2: "string",
      additionalProp3: "string"
    },
    actorList: {
      additionalProp1: "string",
      additionalProp2: "string",
      additionalProp3: "string"
    },
    staffList: {
      additionalProp1: "string",
      additionalProp2: "string",
      additionalProp3: "string"
    },
    ottList: [
      ""
    ],
  });

  const location = useLocation();
  const pathname = location.pathname;

  const extractIdFromPathname = (pathname) => {
    const parts = pathname.split('/');
    return parts[parts.length - 1]; // 마지막 부분이 id 값입니다.
  };

  const id = extractIdFromPathname(pathname);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/ottdata/${id}`)
      .then(response => {
        setMovieData(response.data); //받아온 데이터를 무비리스트에 배열형태로 저장
      })
      .catch(
        error => {console.error("Error fetching movie data", error);
      });
  }, [id]);

  useEffect(()=>{
    let updatedOTTimg = [];
    for(let i=0;i<movieData.ottList.length;i++){
      let arrayList = movieData.ottList[i];
      let correctOTT = LogoImg[arrayList];
      if(correctOTT !== undefined ) {updatedOTTimg = [...updatedOTTimg, correctOTT];}
    }
    setOTTimg(updatedOTTimg);
  }, [movieData]);

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
      if(!isWatchList){
        setIsWatchList(true);
      }
      else{
        setIsWatchList(false);
      }
    }
  }

  return (
    <div className="movie-detail-wrap">
      <div className="movie-detail-movie_img">
        <img src={movieData.backgroundImg} alt="" className="movie-detail-movie_img2"/>
        <div className="movie-detail-overlay">
          <p className="movie-detail-title">{movieData.title}</p>
          <p className="movie-detail-release_date">{movieData.year}</p>
          <p className="movie-detail-time"></p>
        </div>
      </div>
      <div className="movie-detail-all">
        <section className="movie-detail-section1">
          <img src={movieData.posterImg} alt="포스터" className="movie-detail-poster" />
        </section>
        <section className="movie-detail-section3">
          <div className="movie-detail-section2">
            <div>
              {OTTimg.map((img, index) => (
                <img key={index} src={img} className="movie-detail-OTTLogo"/>
              ))}
            </div>
            <div className="movie-detail-avg_rating">
              <p className="movie-detail-rating_num">{movieData.score}</p>
              <label className="movie-detail-rating_count">평균 평점</label>
            </div>
          </div>
          <div className="movie-detail-separator"></div>
          <div className="movie-detail-button2_box">
            <button className={`movie-detail-buttons_icon ${isWatchList ? "movie-detail-watchlist_select" : ""}`} onClick={handleWatchlist}>watchlist 추가</button>
            <hr className='movie-detail-separator2' />
            <button className="movie-detail-buttons_icon" onClick={handleAddComment}>코멘트 추가</button>
          </div>
          <div className="movie-detail-separator"></div>
          <div className="movie-detail-movie_details">{movieData.synopsis}</div>
        </section>
      </div>
      <div className="movie-detail-metadata">
      <div className="movie-detail-metadata-list">
        <h1>작품정보</h1>
        <div className="metadata-content">
          {Object.keys(movieData.metaData).map((key, index) => (
            <div key={index} className="metadata-item">
              <strong>{key}:</strong> {movieData.metaData[key]}
            </div>
          ))}
        </div>
      </div>
      <div className="movie-detail-metadata-list">
        <h1>출연진</h1>
        <ul>
          {Object.entries(movieData.actorList).map(([key, value], index) => (
            <li key={index}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </div>
      <div className="movie-detail-metadata-list">
        <h1>제작진</h1>
        <ul>
          {Object.entries(movieData.staffList).map(([key, value], index) => (
            <li key={index}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </div>
    </div>
      <section className="movie-detail-list">
        <header className="movie-detail-comment">Comments</header>
        <CommentList />
      </section>
    </div>
  );
}