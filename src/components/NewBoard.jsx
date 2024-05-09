import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from './stars/Star';
import TagList from './tag/TagList';
import "./NewBoard.css";

export default function NewBoard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const { ottId } = useParams();
  const [userId, setUserId] = useState('');

  const [inputTags, setInputTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const url = process.env.REACT_APP_URL_PATH;

  // 자식 컴포넌트로부터 선택된 태그를 업데이트하는 콜백 함수
  const updateSelectedTags = (tags) => {
    setSelectedTags(tags);
  };

  // 태그 업데이트 함수
  const handleInputTagUpdate = (updatedInputTags) => {
    setInputTags(updatedInputTags);
  };

  useEffect(() => {
    if (ottId) {
      // 코멘트 수정 모드인 경우, 해당 ID를 사용하여 기존 게시글 데이터를 가져옴
      axios.get(url + `api/ottReview/reviews/user?userId=${ottId}`)
        .then(response => {
          const { title, content, rating } = response.data;
          setInputTags(response.data.inputTags);
          setSelectedTags(response.data.selectedTags)
          setTitle(title);
          setContent(content);
          setRating(rating);
        })
        .catch(error => {
          console.error('게시글 가져오기 오류:', error);
        });
    }
  }, [ottId]);

  function handleContent(event) {
    setContent(event.target.value);
  }

  function handleRating(value) {
    setRating(value);
  }

  function handleCancel() {
    navigate('/board');
  }

  function handleSbumit(event) {
    event.preventDefault();

    // 폼 데이터 수집
    const formData = {
      title: title,
      content: content,
      rating: rating,
      inputTags: inputTags,
      tags: selectedTags,
    };
    console.log(formData);

    if (!ottId) {
      //post 요청, 코멘트 추가
      axios.post(/*백엔드 요청 주소*/url + `/api/ottReview/add/${ottId}?userId=${userId}`, formData)
        .then(response => {
          console.log('응답 데이터:', response.data);
          alert("입력되었습니다.");
          navigate('/board');
        })
        .catch(error => {
          alert("오류");
          console.error('데이터 전송 오류:', error);
        });
    } else {
      // 게시글 수정 모드일 때
      axios.put(url + `/api/ottReview/modify/${ottId}?userId=${userId}`, formData)
        .then(response => {
          console.log('게시글 수정 완료:', response.data);
          alert('게시글이 수정되었습니다.');
          navigate(`details/${ottId}`);
        })
        .catch(error => {
          console.error('게시글 수정 오류:', error);
        });
    }
  }

  return (
    <div>
      <form onSubmit={handleSbumit} className='newboard-form'>
        <h2 className='newboard-texta'>영화 제목</h2>
        <div>
          <label className='newboard-rating'>평점</label>
          <StarRating onChange={handleRating} />
        </div>
        <div>
          <label className='newboard-texta'>Comment</label>
          <textarea
            name="content"
            value={content}
            onChange={handleContent}
            className='newboard-input-box2'
          />
          <TagList updateSelectedTags={updateSelectedTags} onUpdateTags={handleInputTagUpdate} />
        </div>
        <button type='button' onClick={handleCancel} className='newboard-button'>Cancel</button>
        <button type='submit' className='newboard-button'>{ottId ? 'Edit' : 'Save'}</button>
      </form>
    </div>
  );
}