import { useEffect, useState } from 'react';
import profilePicture from '../../images/profilePicture.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./CommentList1.css";

export default function CommentList({ commentList, id }) {
  const [moreButton, setMoreButton] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 경로가 '/userprofile'인 경우 + 코멘트가 5개 이하면 버튼을 숨깁니다.
    if (location.pathname === '/userprofile' || commentList.length <= 5) {
      setMoreButton(false);
    } else {
      setMoreButton(true);
    }
  }, [location]);

  function handleList() {
    navigate(`/list/${id}`);
  }

  // 역순 정렬
  const reverse = [...commentList].reverse();

  return (
    // map 함수로 구현
    <div className='comment-list-1-wid'>
      {moreButton &&
        <div className='comment-list-1-more_button'>
          <button className='comment-list-1-btn' onClick={handleList}>더보기</button>
        </div>
      }
      <ul className='comment-list-1-lli'>
        {commentList.length === 0 ? (
          <p className='comment-list-no_comments'>평가 없음</p>
        ) : (
          // 최신 5개만 출력
          reverse.slice(0, 5).map((comment) => (
            <section className='comment-list-1-comment_board1' key={comment.id}>
              <div className='comment-list-1-user_info_box1'>
                <img src={profilePicture} alt="프로필" className='comment-list-1-user_img1' />
                <p className='comment-list-1-name1'>{comment.author}</p>
                <div className='comment-list-1-rating_box1'>
                  <p className='comment-list-1-rating31'>{comment.score}</p>
                </div>
              </div>
              <Link to={`/comments/${comment.id}`} className='comment-list-1-comment21'>
                {comment.content}
              </Link>
              <div className='comment-list-1-like_reply_box1'>
                <p className='comment-list-1-like_number1'>Like {comment.likesCount}</p>
                <p className='comment-list-1-like_number1'>Reply {comment.repliesCount}</p>
              </div>
            </section>
          ))
        )}
      </ul>
    </div>
  );
}