import { useState } from 'react';
import './NewBoard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NewBoard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  function handleTitle(event) {
    setTitle(event.target.value);
  }

  function handleContent(event) {
    setContent(event.target.value);
  }

  function handleCancel() {
    navigate('..');
  }

  function handleSbumit(event) {
    event.preventDefault();

    // 폼 데이터 수집
    const formData = {
      title: event.target.elements.title.value,
      content: event.target.elements.content.value,
    };
    console.log(formData);

    //post 요청
    axios.post(/*백엔드 요청 주소*/'http://localhost:8080/newboard', formData)
      .then(response => {
        console.log('응답 데이터:', response.data);
        alert("입력되었습니다.");
        navigate('..');
      })
      .catch(error => {
        alert("오류");
        console.error('데이터 전송 오류:', error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSbumit} className='newboard-form'>
        <div>
          <label className='text'>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitle}
            required
            className='input-box1'
          />
        </div>
        <div>
          <label className='text'>Content</label>
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