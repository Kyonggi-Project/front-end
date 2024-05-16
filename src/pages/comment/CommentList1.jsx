import { useEffect, useState } from 'react';
import profilePicture from '../../images/profilePicture.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./CommentList1.css";
import { httpRequest2 } from '../../util/article';

export default function CommentList({ id }) {
  const [moreButton, setMoreButton] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const [commentList, setCommentList] = useState([]);
  //컨텐츠의 모든 코멘트 보기
  useEffect(() => {
    httpRequest2(
      'GET',
      `/api/ottReview/reviews/ott/${id}`,
      null,
      (response) => {
        setCommentList(response.data);
        // 경로가 '/userprofile'인 경우 + 코멘트가 5개 이하면 버튼을 숨깁니다.
        if (location.pathname === '/userprofile' || response.data.length <= 5) {
          setMoreButton(false);
        } else {
          setMoreButton(true);
        }
      },
      (error) => {
        console.error('코멘트 정보를 가져오는데 실패했습니다:', error);
      }
    );
  }, []);

  //해당 유저의 코멘트들을 출력
  useEffect(() => {
    httpRequest2(
      "GET",
      "/api/ottReview/reviews/user",
      null,
      (response) => {
        setCommentList(response.data);
      },
      (error) => {
        console.error("Error fetching comments:", error);
      }
    );
  }, []);

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
                <Link to={`/userprofile/${comment.author}`} className='comment-list-1-name1'>{comment.author}</Link>
                <div className='comment-list-1-rating_box1'>
                  <p className='comment-list-1-rating31'>{comment.score.toFixed(1)}</p>
                </div>
              </div>
              <Link to={`/comments/${id}/${comment.id}`} className='comment-list-1-comment21'>
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