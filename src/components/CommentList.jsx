import axios from "axios";
import { useEffect, useState } from "react";

export default function CommentList() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    //임시 데이터
    const tempComments = [
      { id: 1, author: 'User1', content: 'Comment 1' },
      { id: 2, author: 'User2', content: 'Comment 2' },
      { id: 3, author: 'User3', content: 'Comment 3' }
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
    <div>
      <h2>댓글 리스트</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.author}</p>
            {comment.content}
            </li>
        ))}
      </ul>
    </div>
  );
}