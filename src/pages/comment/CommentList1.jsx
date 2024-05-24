import { useEffect, useState } from "react";
import profilePicture from "../../images/profilePicture.png";
import { Link, useNavigate } from "react-router-dom";
import "./CommentList1.css";
import { useAuth } from "../../util/auth";

export default function CommentList({ comments, id, nickname, pageType }) {
  const [moreButton, setMoreButton] = useState(true);
  const navigate = useNavigate();
  const { isloginHandler } = useAuth();

  useEffect(() => {
    if ((comments && comments.length <= 5) || !comments) {
      setMoreButton(false);
    } else {
      setMoreButton(true);
    }
  }, [comments]);

  function handleList() {
    if (nickname) {
      navigate(`/list/nickname/${nickname}`);
    } else {
      navigate(`/list/id/${id}`);
    }
  }

  // 역순 정렬
  const reverse = comments && [...comments].reverse();
  return (
    // map 함수로 구현
    <div className="comment-list-1-wid">
      {moreButton && (
        <div className="comment-list-1-more_button">
          <button className="comment-list-1-btn" onClick={handleList}>
            더보기
          </button>
        </div>
      )}
      <ul className="comment-list-1-lli">
        {!comments || comments.length === 0 ? (
          <p className="comment-list-no_comments">평가 없음</p>
        ) : (
          // 최신 5개만 출력
          reverse.slice(0, 5).map((comment) => (
            <section className="comment-list-1-comment_board1" key={comment.id}>
              <div className="comment-list-1-user_info_box1">
                {pageType === "MovieDetail" && (
                  <img
                    src={profilePicture}
                    alt="프로필"
                    className="comment-list-1-user_img1"
                  />
                )}
                <Link
                  to={
                    pageType === "MovieDetail"
                      ? `/userprofile/${comment.author}`
                      : `/details/${comment.ottId}`
                  }
                  className="comment-list-1-name1"
                  onClick={isloginHandler}
                >
                  {pageType === "MovieDetail"
                    ? comment.author
                    : comment.contentsTitle}
                </Link>
                <div className="comment-list-1-rating_box1">
                  <p className="comment-list-1-rating31">
                    {comment.score.toFixed(1)}
                  </p>
                </div>
              </div>
              <Link
                to={`/comments/${comment.ottId}/${comment.id}`}
                className="comment-list-1-comment21"
                onClick={isloginHandler}
              >
                <div>
                  {pageType === "UserProfile" && (
                    <img
                      src={comment.contentsPoster}
                      alt="포스터"
                      className="comment-list-1-comment_poster-img"
                    />
                  )}
                </div>
                <div className="comment-list-1-comment_content">
                  {comment.content}
                </div>
              </Link>
              <div className="comment-list-1-like_reply_box1">
                <p className="comment-list-1-like_number1">
                  Like {comment.likesCount}
                </p>
                <p className="comment-list-1-like_number1">
                  Reply {comment.repliesCount}
                </p>
              </div>
            </section>
          ))
        )}
      </ul>
    </div>
  );
}
