import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReplyList from './ReplyList';
import profilePicture from "../../images/profilePicture.png";
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
  const [currentUser, setCurrentUser] = useState('');

  const { isLogin, isloginHandler } = useAuth();
  const { ottId } = useParams();
  const { id } = useParams();

  useEffect(() => {
    httpRequest2(
      'GET',
      `/api/ottReview/reviews/${id}`,
      null,
      (response) => {
        setDetails(response.data);
        setCurrentUser(response.data.author);
        setIsLiked(response.data.liked);
        if (response.data.repliesCount === 0) {
          setIsEmptyText(true);
        } else {
          setIsEmptyText(false);
        }
      },
      (error) => {
        console.error('리뷰 정보를 가져오는데 실패했습니다:', error);
      }
    );

  }, [id]);

  useEffect(() => {
    if (currentUser) {
      httpRequest2(
        'GET',
        `/api/authorize/${currentUser}`,
        null,
        (response) => {
          if (response.data) {
            setIsUser(true);
          } else {
            setIsUser(false);
          }
        },
        (error) => {
          console.error("error", error);
        }
      );
    }
  }, [currentUser]);

  function EditHandler() {
    navigate(`/details/edit/${ottId}/${id}`, { state: { movieTitle: details.contentsTitle } });
  }

  function DeleteHandler() {
    const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
    if (isConfirmed) {
      httpRequest2(
        'DELETE',
        `/api/ottReview/delete/${id}`,
        null,
        () => {
          alert('삭제되었습니다');
          navigate(`/`);
        },
        (error) => {
          alert('오류');
          console.error('삭제에 실패했습니다.', error);
        }
      );
    }
  }

  function handleReplyModal(event) {
    if (!isLogin) {
      isloginHandler(event);
    }
    else if (isUser) {
      alert('본인의 리뷰에 댓글을 작성할 수 없습니다.');
    } else {
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
    else if (isUser) {
      alert("본인의 리뷰에 좋아요를 누를 수 없습니다.");
    }
    else {
      httpRequest2(
        'POST',
        `/api/ottReview-like/toggle/${id}`,
        null,
        () => {
          if (isLiked) {
            setIsLiked(false);
            details.likesCount = details.likesCount - 1
          } else {
            setIsLiked(true);
            details.likesCount = details.likesCount + 1
          }
        },
        (error) => {
          console.error('좋아요 실패', error);
        }
      );
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
      <div className='comment-detail-wrap-box'>
        <div className='comment-detail-profile'>
          <img src={profilePicture} alt="작성자 프로필" className='comment-detail-profile_img' />
          <Link to={`/userprofile/${details.author}`} className='comment-detail-profile_name'>{details.author}</Link>
          <p className='comment-detail-movie_grade_box'>{details.score ? details.score.toFixed(1) : 0}</p>
        </div>
        <hr style={{color:'#eaeaea'}}></hr>
      <p className='comment-detail-text-box'>{details.content}</p>
      </div>
      {/* 해당 글을 쓴 사람이면 보이게*/}
      {isUser &&
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
          isEdit={false}
        />
      }
    </div>
  );
}