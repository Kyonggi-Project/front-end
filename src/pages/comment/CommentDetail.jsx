import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReplyList from './ReplyList';
import profilePicture from "../../images/profilePicture.png";
import SpyFamily from "../../images/spyfamily.jpg";
import ReplyModal from './ReplyModal';
import { useAuth } from '../../util/auth';
import "./CommentDetail.css";
import { httpRequest2 } from '../../util/article';

export default function CommentDetail() {

  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  const [isUser, setIsUser] = useState(false);
  const [isEmptyText, setIsEmptyText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { isLogin, isloginHandler, token } = useAuth();
  const url = process.env.REACT_APP_URL_PATH;
  const { id } = useParams();


  useEffect(() => {
    // 코멘트 정보를 가져오는 함수
    // axios
    //   .get(/*백엔드 url*/url + `/api/ottReview/reviews/${id}`)
    //   .then(
    //     (response) => {
    //       setDetails(response.data);
    //     },
    //   )
    //   .catch((error) => {
    //     console.error('게시글 정보를 가져오는데 실패했습니다:', error);
    //   });

    httpRequest2(
      'GET',
      `/api/ottReview/reviews/${id}`,
      null,
      (response) => {
        setDetails(response.data);
        if(details.repliesCount === 0) {
          setIsEmptyText(true);
        } else {
          setIsEmptyText(false);
        }
      },
      (error) => {
        console.error('게시글 정보를 가져오는데 실패했습니다:', error);
      }
    );

  }, [id]);

  // useEffect(() => {
  //   // 서버로부터 현재 사용자 정보를 가져오는 함수
  //   axios
  //     .get(url + '/api/user', {
  //       headers: {
  //         Authorization: `Bearer ${token}` // JWT 토큰을 Authorization 헤더에 추가
  //       }
  //     })
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.error('게시글 정보를 가져오는데 실패했습니다:', error));

  // }, []);

  //임시 데이터
  const details_dummy = {
    title: '영화 제목',
    content: '코멘트',
    likesCount: 100,
    comments: 1,
  }

  function EditHandler() {
    navigate(`/details/edit/${id}`);
  }

  function DeleteHandler() {
    httpRequest2(
      'DELETE',
      `/api/ottReview/delete/${id}`,
      null,
      (response) => {
        const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
        if (isConfirmed) {
          alert('삭제되었습니다');
          navigate(`/comments/${id}`);
        }
      },
      (error) => {
        alert('오류');
        console.error('삭제에 실패했습니다.', error);
      }
    );
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
      axios
        .post(url + `/api/ottReview-like/toggle/${id}`)
        .then(() => {
          if (isLiked) {
            alert('좋아요 -1');
            setIsLiked(false);
            //1
          } else {
            setIsLiked(true);
            alert("좋아요 +1");
          }

        })
        .catch((error) => {
          console.error('좋아요 실패', error);
        });
    }
  }

  const handleShare = (event) => {
    if (!isLogin) {
      isloginHandler(event);
    }
    else {
      const currentUrl = window.location.href;

      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          alert('URL이 복사되었습니다.');
        })
        .catch((error) => {
          console.error('URL 복사에 실패했습니다:', error);
        });
    }
  }

  return (
    <div className='comment-detail-board_details'>
      <img src={details.backgroundImg} alt="영화 이미지" className='comment-detail-movie_image' />
      <p className='comment-detail-text'>{details.contentsTitle}</p>
      <p className='comment-detail-movie_release'>{details.creatAt}</p>
      <div className='comment-detail-profile'>
        <img src={profilePicture} alt="작성자 프로필" className='comment-detail-profile_img' />
        <p className='comment-detail-profile_name'>{details.author}</p>
      </div>

      <p className='comment-detail-movie_grade_box'>{details.score}</p>
      <p className='comment-detail-text-box'>{details.content}</p>
      {/* 해당 글을 쓴 사람이면 보이게*/}
      {!isUser &&
        <>
          <button className='comment-detail-user_buttons' onClick={DeleteHandler}>Delete</button>
          <button className='comment-detail-user_buttons' onClick={EditHandler}>Edit</button>
        </>
      }

      <div className='comment-detail-totals_box'>
        <p className={'comment-detail-totals'}>좋아요 {details.likesCount}</p>
        <p className='comment-detail-totals'>댓글 {details.repliesCount}</p>
      </div>
      <div className='comment-detail-separator11' />
      <div className='comment-detail-button2_box1'>
        <button className={!isLiked ? 'comment-detail-button2' : 'comment-detail-button2-1'} onClick={handleLike}>좋아요</button>
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