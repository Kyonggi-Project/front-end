import { useEffect, useState } from 'react';
import profilePicture from '../../images/profilePicture.png';
import { Link, useLocation } from 'react-router-dom';
import "./CommentList1.css";
import { httpRequest2 } from '../../util/article';

export default function CommentList() {
  const [commentList, setCommentList] = useState([]);
  const [moreButton, setMoreButton] = useState(true);
  const location = useLocation();
  const url = process.env.REACT_APP_URL_PATH;
  const searchParams = new URLSearchParams(location.search);
  const ottid = searchParams.get('id');

  useEffect(() => {
    // 경로가 '/userprofile'인 경우에만 버튼을 숨깁니다.
    if (location.pathname === '/userprofile') {
      setMoreButton(false);
    } else {
      setMoreButton(true);
    }
  }, [location]);

  useEffect(() => {
    //임시 데이터
    const tempComments = [
      { id: 1, author: 'User1', rating: 3.5, content: 'Comment 1', like: 100, reply: 3 },
      { id: 2, author: 'User2', rating: 4, content: 'Comment 2', like: 200, reply: 4 },
      { id: 3, author: 'User3', rating: 1.5, content: 'Comment 3', like: 300, reply: 5 },
      { id: 4, author: 'User4', rating: 2, content: 'Comment 4', like: 400, reply: 6 },
      { id: 5, author: 'User5', rating: 5, content: 'Comment 5', like: 500, reply: 7 }
    ];
    setCommentList(tempComments);
    //모든 코멘트 보기
    httpRequest2(
      'GET',
      url + `/api/ottReview/ott/${ottid}`,
      null,
      (response) => {
        setCommentList(tempComments);
        console.log(response.data);
      },
      (error) => {
        console.error('코멘트 정보를 가져오는데 실패했습니다:', error);
      }
    );
  }, []);

  return (
    // map 함수로 구현
    <div className='comment-list-1-wid'>
      {moreButton &&
        <div className='comment-list-1-more_button'>
          <Link to="/list">
            <button className='comment-list-1-btn'>더보기</button>
          </Link>
        </div>
      }
      <ul className='comment-list-1-lli'>
        {commentList.map((commentList) => (
          <>
            <section className='comment-list-1-comment_board1' key={commentList.id}>
              <div className='comment-list-1-user_info_box1'>
                <img src={profilePicture} alt="프로필" className='comment-list-1-user_img1' />
                <p className='comment-list-1-name1'>{commentList.author}</p>
                <div className='comment-list-1-rating_box1'>
                  <p className='comment-list-1-rating31'>{commentList.rating}</p>
                </div>
              </div>
              <Link to={`/comments?id=${commentList.id}`} className='comment-list-1-comment21'>
                {commentList.content}
              </Link>
              <div className='comment-list-1-like_reply_box1'>
                <p className='comment-list-1-like_number1'>Like {commentList.likesCount}</p>
                <p className='comment-list-1-like_number1'>Reply {commentList.reply}</p>
              </div>
            </section>
          </>
        ))}
      </ul>
    </div>
  );
}