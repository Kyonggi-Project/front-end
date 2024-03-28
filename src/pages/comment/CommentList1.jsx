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
        <Link to="/">
        <button className='btn'>더보기</button>
        </Link>
      </div>
      <ul className='ll'>
        {commentList.map((commentList, index) => (
          <>
            <section className='comment_board' key={commentList.id}>
              <div className='user_info_box'>
                <img src={profilePicture} alt="프로필" className='user_img' />
                <p className='name'>{commentList.author}</p>
                <div className='rating_box'>
                  <p className='rating3'>{commentList.rating}</p>
                </div>
              </div>
              <p className='comment2'>
                {commentList.content}
              </p>
              <div className='like_reply_box'>
                <p className='like_number'>Like {commentList.like}</p>
                <p className='like_number'>Reply {commentList.reply}</p>
              </div>
              {(index + 1) % 3 === 0 && <br />}
            </section>
          </>
        ))}
      </ul>
    </div>
  );
}