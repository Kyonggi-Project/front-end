import { useEffect, useState } from "react";
import StarRating from "./stars/Star";
import Toast from "./toast/Toast.jsx";
import CommentList from "../pages/comment/CommentList1.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { httpRequest2 } from "../util/article.js";
import axios from "axios";
import { useAuth } from '../util/auth';
import "./MovieDetail.css";
import netflix from '../images/netflix.png';
import watcha from '../images/watcha.png';
import disney from '../images/disney.jpg';
import tving from '../images/tving.png';
import wavve from '../images/wavve.png';

const url = process.env.REACT_APP_URL_PATH;
const LogoImg = { 'Netflix': netflix, "Watcha": watcha, "Disney": disney, "Tving": tving, "Wavve": wavve };

export default function MovieDetail() {
  const navigate = useNavigate();
  const { isLogin, isloginHandler } = useAuth();
  const [isWatchList, setIsWatchList] = useState(false);
  const [toast, setToast] = useState(false);
  let [OTTimg, setOTTimg] = useState([]);
  const [userData, setUserData] = useState([]);

  const [movieData, setMovieData] = useState({
    title: "title",
    year: 0,
    posterImg: "",
    backgroundImg: "",
    genreList: [
      "string"
    ],
    synopsis: "",
    score: 0,
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
        error => {
          console.error("Error fetching movie data", error);
        });
  }, [id]);

  //85~92: nickname 정보를 받아 /api/user/profile/myPage에서 userid 받아오기
  useEffect(() => {
    httpRequest2(
      'GET',
      '/api/user/profile/myPage',
      null,
      (response) => {
        setUserData(response.data.watchList.id);
      },
      (error) => {
        console.error("Error fetching user info:", error);
      }
    );
  }, []);

  useEffect(() => {
    let updatedOTTimg = [];
    for (let i = 0; i < movieData.ottList.length; i++) {
      let arrayList = movieData.ottList[i];
      let correctOTT = LogoImg[arrayList];
      if (correctOTT !== undefined) { updatedOTTimg = [...updatedOTTimg, correctOTT]; }
    }
    setOTTimg(updatedOTTimg);
  }, [movieData]);

  const handleAddComment = (event) => {
    if (!isLogin) {
      isloginHandler(event);
    }
    else {
      localStorage.setItem('movie-title', movieData.title);
      navigate(`/details/write/${id}`);
    }
  }

  const handleWatchlist = (event) => {
    if (!isLogin) {
      isloginHandler(event);
    }
    else {
      if (!isWatchList) {
        setIsWatchList(true);
          axios.post('http://localhost:8080/api/watchList/toggle', {
          ottContentsId: {id},
          userId: {userData}
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('요청이 실패했습니다.', error);
        });
        setToast(true);
      }
      else {
        setIsWatchList(false);
        setToast(true);
      }
    }
  }

  const [commentList, setCommentList] = useState([
    //임시 데이터
    { id: 1, author: 'User1', rating: 3.5, content: 'Comment 1', likesCount: 100, reply: 3 },
    { id: 2, author: 'User2', rating: 4, content: 'Comment 2', likesCount: 200, reply: 4 },
    { id: 3, author: 'User3', rating: 1.5, content: 'Comment 3', likesCount: 300, reply: 5 },
    { id: 4, author: 'User4', rating: 2, content: 'Comment 4', likesCount: 400, reply: 6 },
    { id: 5, author: 'User5', rating: 5, content: 'Comment 5', likesCount: 500, reply: 7 },
    { id: 6, author: 'User5', rating: 5, content: 'Comment 5', likesCount: 500, reply: 7 },
  ]);
  //컨텐츠의 모든 코멘트 보기
  useEffect(() => {
    httpRequest2(
      'GET',
      `/api/ottReview/reviews/ott/${id}`,
      null,
      (response) => {
        setCommentList(response.data);
        console.log(response.data);
      },
      (error) => {
        console.error('코멘트 정보를 가져오는데 실패했습니다:', error);
      }
    );
  }, []);

  return (
    <div className="movie-detail-wrap">
      <div className="movie-detail-movie_img">
        <img src={movieData.backgroundImg} alt="" className="movie-detail-movie_img2" />
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
            <div className="movie-detail-rating-box">
              <StarRating value={movieData.score}/>
              <p className="movie-detail-rating_num">{movieData.score}</p>
              <label className="movie-detail-rating_count">평균 평점</label>
            </div>
            <div className="movie-detail-avg_rating">
              {OTTimg.map((img, index) => (
                <img key={index} src={img} className="movie-detail-OTTLogo" />
              ))}
            </div>
          </div>
          <div className="movie-detail-separator"></div>
          <div className="movie-detail-button2_box">
            <button className={`movie-detail-buttons_icon ${isWatchList ? "movie-detail-watchlist_select" : ""}`} onClick={handleWatchlist}>watchlist 추가</button>
            {toast && <Toast setToast={setToast} value={isWatchList}/>}
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
        <CommentList commentList={commentList} id={id} />
      </section>
    </div>
  );
}