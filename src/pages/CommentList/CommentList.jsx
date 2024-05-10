import React from 'react';
import commentsData from './data.json'; // JSON 데이터 import
import "./Comment.css";

const Comment = ({ profile, likes, comments, rating, profileLink }) => (
  <>
    <section className='comment_board'>
      <div className='comment-user_info_box'>
          <img src="logo192.png" alt="프로필" className='comment-user_img' />
          <p className='comment-name'>{profile}</p>
          <div className='comment-rating_box'>
            <p className='comment-rating3'>{rating}</p>
          </div>
      </div>
      <p className='comment-comment2'>
        rgegw
      </p>
      <div className='comment-like_reply_box'>
        <p className='comment-like_number'>Like {likes}</p>
        <p className='comment-like_number'>Comments {comments}</p>
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
    <div className='comment-titlebox'>
      <h1>Comments</h1>
    </div>
    <ul className='comment-ll'>
        <CommentList data={commentsData} />
    </ul>
  </>
);

export default CommentApp;
