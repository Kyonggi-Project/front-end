import { useState } from 'react';
import './NewBoard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRating from './stars/Star';

export default function NewBoard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  function handleContent(event) {
    setContent(event.target.value);
  }

  function handleRating(value) {
    setRating(value);
  }

  function handleCancel() {
    navigate('..');
  }

  function handleSbumit(event) {
    event.preventDefault();

    // 폼 데이터 수집
    const formData = {
      content: event.target.elements.content.value,
      rating: rating,
    };
    console.log(formData);

    //post 요청
    axios.post(/*백엔드 요청 주소*/'http://localhost:8080/write', formData)
      .then(response => {
        console.log('응답 데이터:', response.data);
        alert("입력되었습니다.");
        navigate('/board');
      })
      .catch(error => {
        alert("오류");
        console.error('데이터 전송 오류:', error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSbumit} className='newboard-form'>
        <h2>영화 제목</h2>
        <div>
          <label className='rating'>평점</label>
          <StarRating onChange={handleRating} />
        </div>
        <div>
          <label className='text'>Comment</label>
          <textarea
            name="content"
            value={content}
            onChange={handleContent}
            className='input-box2'
          />
        </div>
        <button type='button' onClick={handleCancel} className='buttons'>Cancel</button>
        <button type='submit' className='buttons'>Save</button>
      </form>
    </div>
  );
}