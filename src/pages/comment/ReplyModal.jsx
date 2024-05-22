import React, { useEffect, useState } from "react";
import "./ReplyModal.css";
import { httpRequest2 } from "../../util/article";
import { useParams } from "react-router-dom";
const ReplyModal = ({ closeModal, isEdit, content, replyId }) => {
  const [reply, setReply] = useState("");
  const { id } = useParams();

  const formdata = {
    content: reply
  }

  useEffect(() => {
    if (isEdit) {
      setReply(content);
    }
  },[isEdit]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (isEdit) {
      httpRequest2(
        'PUT',
        `/api/reply/update?replyId=${replyId}`,
        formdata,
        () => {
          alert("댓글을 수정했습니다.");
          window.location.reload();
          closeModal();
        },
        (error) => {
          alert("댓글 수정에 실패했습니다.");
          console.error("댓글 수정 실패", error);
        }
      );

    } else {
      httpRequest2(
        'POST',
        `/api/reply/add?ottReviewId=${id}`,
        formdata,
        () => {
          alert("댓글을 작성했습니다.");
          window.location.reload();
          closeModal();
        },
        (error) => {
          alert("댓글 작성에 실패했습니다.");
          console.error("댓글 작성 실패", error);
        }
      );
    }
  }

  return (
    <div className="reply-wrap-modal">
      <div className="reply-modal-box">
        <button type="button" className="reply-modal-close-button" onClick={closeModal}>
          X
        </button>
        <h2 className="reply-modal-main-title">
          {!isEdit ?
            <p>댓글을 작성해 주세요</p> :
            <p>댓글을 수정해 주세요</p>
          }

        </h2>
        <form className="reply-input-group" onSubmit={handleSubmitForm}>
          <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} />
          <button className="reply-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReplyModal;
