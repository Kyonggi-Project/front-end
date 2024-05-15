import { useEffect, useState } from "react";
import profilePicture from "../../images/profilePicture.png";
import "./ReplyList.css"
import { useParams } from "react-router-dom";
import { httpRequest2 } from "../../util/article";
import ReplyModal from "./ReplyModal";

export default function ReplyList() {
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [currentComment, setCurrentComment] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [replyId, setReplyId] = useState('');

  useEffect(() => {
    httpRequest2(
      'GET',
      `/api/reply/view?ottReviewId=${id}`,
      null,
      response => {
        setComments(response.data);
      },
      error => {
        console.error('댓글을 가져오는 동안 오류가 발생했습니다:', error);
      }
    );
  }, [id]);

  function handleEditReplyModal(comment) {
    setReplyId(comment.id);
    setCurrentComment(comment.content);
    httpRequest2(
      'GET',
      `/api/authorize/${comment.nickname}`,
      null,
      (response) => {
        if (response.data) {
          setShowModal(true);
        } else {
          alert('수정할 수 없습니다.');
        }
      },
      (error) => {
        console.error("error", error);
      }
    );
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleDelete(comment) {
    httpRequest2(
      'GET',
      `/api/authorize/${comment.nickname}`,
      null,
      (response) => {
        if (response.data) {
          const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
          if (isConfirmed) {
            httpRequest2(
              'DELETE',
              `/api/reply/delete?replyId=${comment.id}`,
              null,
              () => {
                alert('삭제되었습니다');
                window.location.reload();
              },
              (error) => {
                alert('오류');
                console.error('삭제에 실패했습니다.', error);
              }
            );
          }
        } else {
          alert('삭제할 수 없습니다.');
        }
      },
      (error) => {
        console.error("error", error);
      }
    );
  }

  return (
    <>
      <div className="reply-list-color1">
        {comments.length === 0 ?
          <p className="reply-list-no-reply">댓글 없음</p> : (
            <ul>
              {comments.map(comment => (
                <div className="reply-list">
                  <div key={comment.id}>
                    <div className="reply-list-user_info">
                      <div className="reply-list-profile-info">
                        <img src={profilePicture} alt="profile_img" className="reply-list-profile_img" />
                        <p>{comment.nickname}</p>
                      </div>
                      <div className="buttons-container">
                        <button className="reply-list-button" onClick={() => handleEditReplyModal(comment)}>수정</button>
                        <div className="reply-list-separator2" />
                        <button className="reply-list-button" onClick={() => handleDelete(comment)}>삭제</button>
                      </div>
                    </div>
                    {comment.content}
                  </div >
                  <div className="reply-list-separator" />
                </div>
              ))}
            </ul>
          )
        }
      </div>
      {showModal &&
        <ReplyModal
          closeModal={handleCloseModal}
          isEdit={true}
          content={currentComment}
          replyId={replyId}
        />
      }
    </>
  );
}