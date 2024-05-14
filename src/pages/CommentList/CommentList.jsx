import React, { useEffect, useState } from 'react';
import "./Comment.css";
import { httpRequest2 } from '../../util/article';
import { Link, useParams } from 'react-router-dom';

const Comment = ({ profile, likes, comments, score, reply, id }) => (
  <>
    <section className='comment_board'>
      <div className='comment-user_info_box'>
        <img src="logo192.png" alt="프로필" className='comment-user_img' />
        <p className='comment-name'>{profile}</p>
        <div className='comment-rating_box'>
          <p className='comment-rating3'>{score}</p>
        </div>
      </div>
      <Link to={`/comments/${id}`}  className='comment-comment2'>
        {comments}
      </Link>
      <div className='comment-like_reply_box'>
        <p className='comment-like_number'>Like {likes}</p>
        <p className='comment-like_number'>Reply {reply}</p>
      </div>
    </section>
  </>
);

const CommentList = ({ data }) => (
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
      // profileLink={comment.profileLink}
      />
    ))}
  </div>
);

export default function CommentApp() {
  const { id } = useParams();
  const [commentList, setCommentList] = useState([
    //임시 데이터
    { id: 1, author: 'User1', rating: 3.5, content: 'Comment 1', likesCount: 100, reply: 3 },
    { id: 2, author: 'User2', rating: 4, content: 'Comment 2', likesCount: 200, reply: 4 },
    { id: 3, author: 'User3', rating: 1.5, content: 'Comment 3', likesCount: 300, reply: 5 },
    { id: 4, author: 'User4', rating: 2, content: 'Comment 4', likesCount: 400, reply: 6 },
    { id: 5, author: 'User5', rating: 5, content: 'Comment 5', likesCount: 500, reply: 7 },
    { id: 6, author: 'User5', rating: 5, content: 'Comment 5', likesCount: 500, reply: 7 },
  ]);
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
        <CommentList data={commentList} />
      </ul>
    </>
  );
}
