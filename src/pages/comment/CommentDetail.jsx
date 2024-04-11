import { useEffect, useState } from 'react';
import './CommentDetail.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReplyList from './ReplyList';
import profilePicture from "../../images/profilePicture.png";
import SpyFamily from "../../images/spyfamily.jpg";
import ReplyModal from './ReplyModal';
import { useAuth } from '../../util/auth';

export default function CommentDetail() {

  const [details, setDetails] = useState();
  const param = useParams();
  // const { id } = useParams();
  const navigate = useNavigate();

  const [isUser, setIsUser] = useState(false);
  const [isEmptyText, setIsEmptyText] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { isLogin, isloginHandler } = useAuth();

  const id = param.boardId;

  useEffect(() => {
    // 게시글 정보를 가져오는 함수
    const fetchPost = async () => {
      try {
        const response = await axios.get(/*백엔드 url*/`http://localhost:8080/comments${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error('게시글 정보를 가져오는데 실패했습니다:', error);
      }
    };

    fetchPost();
  }, [id]);

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
    <div className='board_details'>
      <img src={SpyFamily} alt="영화 이미지" className='movie_image' />
      <p className='text'>{details_dummy.title}</p>
      <p className='movie_release'>2013</p>
      <div className='profile'>
        <img src={profilePicture} alt="작성자 프로필" className='profile_img' />
        <p className='profile_name'>작성자 이름</p>
      </div>

      <p className='movie_grade_box'>4.5</p>
      <p className='text-box'>{details_dummy.content}</p>
      {/* 해당 글을 쓴 사람이면 보이게*/}
      {isUser &&
        <>
          <button className='user_buttons' onClick={DeleteHandler}>Delete</button>
          <button className='user_buttons' onClick={EditHandler}>Edit</button>
        </>
      }

      <div className='totals_box'>
        <p className='totals'>좋아요 {details_dummy.likes}</p>
        <p className='totals'>댓글 {details_dummy.comments}</p>
      </div>
      <div className='separator11' />
      <div className='button2_box1'>
        <button className='button2' onClick={handleLike}>좋아요</button>
        <hr className='separator22' />
        <button className='button2' onClick={handleReplyModal}>댓글</button>
        <hr className='separator22' />
        <button className='button2' onClick={handleShare}>공유</button>
      </div>
      <div className='separator11' />

      {/* 댓글 없을 시 */}
      {isEmptyText &&
        <p className='empty_msg_text'>댓글 없음</p>
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