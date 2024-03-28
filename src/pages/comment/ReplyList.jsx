import axios from "axios";
import "./ReplyList.css";
import { useEffect, useState } from "react";
import profilePicture from "../../images/profilePicture.png";

export default function ReplyList() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    //임시 데이터
    const tempComments = [
      { id: 1, author: 'User1', content: 'Comment 1' },
      { id: 2, author: 'User2', content: 'Comment 2' },
      { id: 3, author: 'User3', content: 'Comment 3' },
      { id: 4, author: 'User4', content: 'Comment 4' }
    ];
    setComments(tempComments);
    //    axios.get('/comments')
    //      .then(response => {
    //        setComments(response.data);
    //      })
    //      .catch(error => {
    //        console.error('댓글을 가져오는 동안 오류가 발생했습니다:', error);
    //      });
  }, []);

  return (
    <div className="color1">
      <ul>
        {comments.map(comment => (
          <>
            <div key={comment.id}>
              <div className="user_info">
                <img src={profilePicture} alt="profile_img" className="profile_img" />
                <p>{comment.author}</p>
              </div>
              {comment.content}
            </div >
            <div className="separator" />
          </>
        ))}
      </ul>
    </div >
  );
}