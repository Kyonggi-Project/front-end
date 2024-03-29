import { useEffect, useState } from 'react';
import './CommentList1.css';
import profilePicture from '../../images/profilePicture.png';
import { Link } from 'react-router-dom';

export default function CommentList() {
  const [commentList, setCommentList] = useState([]);
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
  }, []);

  return (
    // map 함수로 구현
    <div className='wid'>
      <div className='more_button'>
        <Link to="/list">
        <button className='btn'>더보기</button>
        </Link>
      </div>
      <ul className='lli'>
        {commentList.map((commentList) => (
          <>
            <section className='comment_board1' key={commentList.id}>
              <div className='user_info_box1'>
                <img src={profilePicture} alt="프로필" className='user_img1' />
                <p className='name1'>{commentList.author}</p>
                <div className='rating_box1'>
                  <p className='rating31'>{commentList.rating}</p>
                </div>
              </div>
              <Link to={`/comments?index=${commentList.id}`} className='comment21'>
                {commentList.content}
              </Link>
              <div className='like_reply_box1'>
                <p className='like_number1'>Like {commentList.like}</p>
                <p className='like_number1'>Reply {commentList.reply}</p>
              </div>
            </section>
          </>
        ))}
      </ul>
    </div>
  );
}