import { useEffect, useState } from 'react';
import './NewBoard.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from './stars/Star';
import TagInput from './tag/TagInput';
import TagList from './tag/TagList';

export default function NewBoard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputTags, setInputTags] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (id) {
      // 게시글 수정 모드인 경우, 해당 ID를 사용하여 기존 게시글 데이터를 가져옴
      axios.get(`http://localhost:8080/write/${id}`)
        .then(response => {
          const { title, content, rating } = response.data;
          setTitle(title);
          setContent(content);
          setRating(rating);
        })
        .catch(error => {
          console.error('게시글 가져오기 오류:', error);
        });
    }
  }, [id]);

  function handleContent(event) {
    setContent(event.target.value);
  }

  function handleRating(value) {
    setRating(value);
  }

  function handleCancel() {
    navigate('/board');
  }
  // 태그를 추가하는 함수
  const addInputTag = (tag) => {
    setInputTags([...inputTags, tag]);
  };

  const addTag = (tag) => {
    setTags([...tags, tag]);
  };

  function handleSbumit(event) {
    event.preventDefault();

    // 폼 데이터 수집
    const formData = {
      title: title,
      content: content,
      rating: rating,
      inputTags: inputTags,
      tags: tags,
    };
    console.log(formData);

    if (!id) {
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
    } else {
      // 게시글 수정 모드일 때
      axios.put(`http://localhost:8080/posts/${id}`, formData)
        .then(response => {
          console.log('게시글 수정 완료:', response.data);
          alert('게시글이 수정되었습니다.');
          navigate('/board');
        })
        .catch(error => {
          console.error('게시글 수정 오류:', error);
        });
    }
  }

  return (
    <div>
      <form onSubmit={handleSbumit} className='newboard-form'>
        <h2 className='texta'>영화 제목</h2>
        <div>
          <label className='rating'>평점</label>
          <StarRating onChange={handleRating} />
        </div>
        <div>
          <label className='texta'>Comment</label>
          <textarea
            name="content"
            value={content}
            onChange={handleContent}
            className='input-box2'
          />
          <TagList addTags={addTag} />
          <TagInput addTag={addInputTag} />
        </div>
        <button type='button' onClick={handleCancel} className='buttons'>Cancel</button>
        <button type='submit' className='buttons'>{id ? 'Edit' : 'Save'}</button>
      </form>
    </div>
  );
}