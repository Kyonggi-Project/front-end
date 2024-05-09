import axios from "axios";
import { useEffect, useState } from "react";
import profilePicture from "../../images/profilePicture.png";
import "./ReplyList.css"

export default function ReplyList() {
  const [comments, setComments] = useState([]);
  const [articleId, setArticleId] = useState('');
  const url = process.env.REACT_APP_URL_PATH;

  useEffect(() => {
    //임시 데이터
    const tempComments = [
      { id: 1, nickname: 'User1', content: 'Reply 1' },
      { id: 2, nickname: 'User2', content: 'Reply 2' },
      { id: 3, nickname: 'User3', content: 'Reply 3' },
      { id: 4, nickname: 'User4', content: 'Reply 4' }
    ];
    setComments(tempComments);
       axios.get(url + `/api/comment/comments/${articleId}`)
         .then(response => {
           setComments(response.data);
         })
         .catch(error => {
           console.error('댓글을 가져오는 동안 오류가 발생했습니다:', error);
         });
  }, []);

  return (
    <div className="reply-list-color1">
      <ul>
        {comments.map(comment => (
          <>
            <div key={comment.id}>
              <div className="reply-list-user_info">
                <img src={profilePicture} alt="profile_img" className="reply-list-profile_img" />
                <p>{comment.nickname}</p>
              </div>
              {comment.content}
            </div >
            <div className="reply-list-separator" />
          </>
        ))}
      </ul>
    </div >
  );
}