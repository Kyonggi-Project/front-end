import React from 'react';
import commentsData from './data.json'; // JSON 데이터 import
import './Comment.css'; // CSS 파일 import

const Comment = ({ profile, likes, comments, rating, profileLink }) => (
  <>
    <section className='comment_board'>
      <div className='user_info_box'>
          <img src="logo192.png" alt="프로필" className='user_img' />
          <p className='name'>{profile}</p>
          <div className='rating_box'>
            <p className='rating3'>{rating}</p>
          </div>
      </div>
      <p className='comment2'>
        rgegw
      </p>
      <div className='like_reply_box'>
        <p className='like_number'>Like {likes}</p>
        <p className='like_number'>Comments {comments}</p>
      </div>
    </section>
  </>
);

const CommentList = ({ data }) => (
  <div>
    {data.map((comment, index) => (
      <Comment
        key={index}
        profile={comment.profile}
        likes={comment.likes}
        comments={comment.comments}
        rating={comment.rating}
        profileLink={comment.profileLink}
      />
    ))}
  </div>
);

const CommentApp = () => (
  <>
    <div className='titlebox'>
      <h1>Comment</h1>
    </div>
    <ul className='ll'>
        <CommentList data={commentsData} />
    </ul>
  </>
);

export default CommentApp;
