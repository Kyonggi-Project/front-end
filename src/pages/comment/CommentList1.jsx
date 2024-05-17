import { useEffect, useState } from 'react';
import profilePicture from '../../images/profilePicture.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./CommentList1.css";
import { useAuth } from '../../util/auth';

export default function CommentList({ comments, id, nickname }) {
  const [moreButton, setMoreButton] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isloginHandler } = useAuth();

  useEffect(() => {
    if (location.pathname === '/userprofile/:id' || (comments && comments.length <= 5) || !comments) {
      setMoreButton(false);
    } else {
      setMoreButton(true);
    }
  });

  function handleList() {
    if(nickname) {
      navigate(`/list/${nickname}`);
    }
    else {
      navigate(`/list/${id}`);
    }
  }

  // 역순 정렬
  const reverse = comments && [...comments].reverse();
  return (
    // map 함수로 구현
    <div className='comment-list-1-wid'>
      {moreButton &&
        <div className='comment-list-1-more_button'>
          <button className='comment-list-1-btn' onClick={handleList}>더보기</button>
        </div>
      }
      <ul className='comment-list-1-lli'>
        {!comments ? (
          <p className='comment-list-no_comments'>평가 없음</p>
        ) : (
          // 최신 5개만 출력
          reverse.slice(0, 5).map((comment) => (
            <section className='comment-list-1-comment_board1' key={comment.id}>
              <div className='comment-list-1-user_info_box1'>
                <img src={profilePicture} alt="프로필" className='comment-list-1-user_img1' />
                <Link
                  to={`/userprofile/${comment.author}`}
                  className='comment-list-1-name1'
                  onClick={isloginHandler}
                >
                  {comment.author}
                </Link>
                <div className='comment-list-1-rating_box1'>
                  <p className='comment-list-1-rating31'>{comment.score.toFixed(1)}</p>
                </div>
              </div>
              <Link
                to={`/comments/${id}/${comment.id}`}
                className='comment-list-1-comment21'
                onClick={isloginHandler}
              >
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