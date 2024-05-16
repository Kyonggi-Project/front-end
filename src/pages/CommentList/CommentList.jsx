import React, { useEffect, useState } from 'react';
import "./Comment.css";
import { httpRequest2 } from '../../util/article';
import { Link, useParams } from 'react-router-dom';
import profilePicture from '../../images/profilePicture.png';

const Comment = ({ profile, likes, comments, score, reply, id, ottId }) => (
  <>
    <section className='comment_board'>
      <div className='comment-user_info_box'>
        <img src={profilePicture} alt="프로필" className='comment-user_img' />
        <Link to={`/userprofile/${profile}`} className='comment-name'>{profile}</Link>
        <div className='comment-rating_box'>
          <p className='comment-rating3'>{score.toFixed(1)}</p>
        </div>
      </div>
      <Link to={`/comments/${ottId}/${id}`} className='comment-comment2'>
        {comments}
      </Link>
      <div className='comment-like_reply_box'>
        <p className='comment-like_number'>Like {likes}</p>
        <p className='comment-like_number'>Reply {reply}</p>
      </div>
    </section>
  </>
);

const CommentList = ({ data, ottId }) => (
  <div>
    {data.map((comment) => (
      <Comment
        key={comment.id}
        id={comment.id}
        profile={comment.author}
        likes={comment.likesCount}
        comments={comment.content}
        score={comment.score}
        reply={comment.repliesCount}
        ottId={ottId}
      // profileLink={comment.profileLink}
      />
    ))}
  </div>
);

export default function CommentApp() {
  const { id } = useParams();
  const [commentList, setCommentList] = useState([]);
  //컨텐츠의 모든 코멘트 보기
  useEffect(() => {
    httpRequest2(
      'GET',
      `/api/ottReview/reviews/ott/${id}`,
      null,
      (response) => {
        setCommentList(response.data);
        // setCommentList(commentList);
        // console.log(response.data);
      },
      (error) => {
        console.error('코멘트 정보를 가져오는데 실패했습니다:', error);
      }
    );
  }, []);

  return (
    <>
      <div className='comment-titlebox'>
        <h1>Comments</h1>
      </div>
      <ul className='comment-ll'>
        <CommentList data={commentList} ottId={id} />
      </ul>
    </>
  );
}
