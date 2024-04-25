import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReplyList from './ReplyList';
import profilePicture from "../../images/profilePicture.png";
import SpyFamily from "../../images/spyfamily.jpg";
import ReplyModal from './ReplyModal';
import { useAuth } from '../../util/auth';
import "./CommentDetail.css";

export default function CommentDetail() {

  const [details, setDetails] = useState([]);
  const param = useParams();
  // const { id } = useParams();
  const navigate = useNavigate();

  const [isUser, setIsUser] = useState(false);
  const [isEmptyText, setIsEmptyText] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { isLogin, isloginHandler, token } = useAuth();

  const id = param.boardId;

  useEffect(() => {
    // 게시글 정보를 가져오는 함수
    axios
      .get(/*백엔드 url*/`http://localhost:8080/comments?id=${id}`)
      .then((response) => setDetails(response.data))
      .catch((error) => {
        console.error('게시글 정보를 가져오는데 실패했습니다:', error);
      });

  }, [id]);

  useEffect(() => {
    // 서버로부터 현재 사용자 정보를 가져오는 함수
    axios
      .get('http://localhost:8080/api/user', {
        headers: {
          Authorization: `Bearer ${token}` // JWT 토큰을 Authorization 헤더에 추가
        }
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error('게시글 정보를 가져오는데 실패했습니다:', error));

  }, []);

  //임시 데이터
  const details_dummy = {
    title: '영화 제목',
    content: '코멘트',
    likes: 100,
    comments: 1,
  }

  function EditHandler() {
    navigate(`/write/${id}`);
  }

  function DeleteHandler() {
    navigate("..");
  }

  function handleReplyModal(event) {
    if (!isLogin) {
      isloginHandler(event);
    }
    else {
      setShowModal(true);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleLike = (event) => {
    if (!isLogin) {
      isloginHandler(event);
    }
    else {

    }
  }

  const handleShare = (event) => {
    if (!isLogin) {
      isloginHandler(event);
    }
    else {

    }
  }

  return (
    <div className='comment-detail-board_details'>
      <img src={SpyFamily} alt="영화 이미지" className='comment-detail-movie_image' />
      <p className='comment-detail-text'>{details_dummy.title}</p>
      <p className='comment-detail-movie_release'>2013</p>
      <div className='comment-detail-profile'>
        <img src={profilePicture} alt="작성자 프로필" className='comment-detail-profile_img' />
        <p className='comment-detail-profile_name'>작성자 이름</p>
      </div>

      <p className='comment-detail-movie_grade_box'>4.5</p>
      <p className='comment-detail-text-box'>{details_dummy.content}</p>
      {/* 해당 글을 쓴 사람이면 보이게*/}
      {isUser &&
        <>
          <button className='comment-detail-user_buttons' onClick={DeleteHandler}>Delete</button>
          <button className='comment-detail-user_buttons' onClick={EditHandler}>Edit</button>
        </>
      }

      <div className='comment-detail-totals_box'>
        <p className='comment-detail-totals'>좋아요 {details_dummy.likes}</p>
        <p className='comment-detail-totals'>댓글 {details_dummy.comments}</p>
      </div>
      <div className='comment-detail-separator11' />
      <div className='comment-detail-button2_box1'>
        <button className='comment-detail-button2' onClick={handleLike}>좋아요</button>
        <hr className='comment-detail-separator22' />
        <button className='comment-detail-button2' onClick={handleReplyModal}>댓글</button>
        <hr className='comment-detail-separator22' />
        <button className='comment-detail-button2' onClick={handleShare}>공유</button>
      </div>
      <div className='comment-detail-separator11' />

      {/* 댓글 없을 시 */}
      {isEmptyText &&
        <p className='comment-detail-empty_msg_text'>댓글 없음</p>
      }

      {/* 댓글 있을 시 */}
      {!isEmptyText &&
        <ReplyList />
      }

      {showModal &&
        <ReplyModal
          closeModal={handleCloseModal}
        />
      }
    </div>
  );
}