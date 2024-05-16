import { useEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import StarRating from './stars/Star';
import TagList from './tag/TagList';
import "./NewBoard.css";
import { httpRequest2 } from '../util/article';

export default function NewBoard() {
  const [title, setTitle] = useState(localStorage.getItem('movie-title'));
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const { ottId } = useParams();
  const { id } = useParams();

  const [inputTags, setInputTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const match = useMatch("/details/:action/:ottId");
  const match2 = useMatch("/details/:action/:ottId/:id");

  // 자식 컴포넌트로부터 선택된 태그를 업데이트하는 콜백 함수
  const updateSelectedTags = (tags) => {
    setSelectedTags(tags);
  };

  // 태그 업데이트 함수
  const handleInputTagUpdate = (updatedInputTags) => {
    setInputTags(updatedInputTags);
  };

  useEffect(() => {
    if (match2 && match2.params.action === 'edit') {
      // 코멘트 수정 모드인 경우, 해당 ID를 사용하여 기존 게시글 데이터를 가져옴
      httpRequest2(
        'GET',
        `/api/ottReview/reviews/${id}`,
        null,
        (response) => {
          setTitle(response.data.contentsTitle);
          setContent(response.data.content);
          setRating(response.data.score);
        },
        (error) => {
          console.error('게시글 정보를 가져오는데 실패했습니다:', error);
        }
      );
    }
  }, [id]);

  function handleContent(event) {
    setContent(event.target.value);
  }

  function handleRating(value) {
    setRating(value);
  }

  function handleCancel() {
    if (match2 && match2.params.action === 'edit') {
      navigate(`/comments/${ottId}/${id}`)
    } else {
      localStorage.removeItem('movie-title');
      navigate(`/details/${ottId}`);
    }
  }

  function handleSbumit(event) {
    event.preventDefault();

    // 폼 데이터 수집
    const formData = match && match.params.action === 'write' ? {
      content: content,
      score: rating,
      inputTags: inputTags,
      tags: selectedTags,
    } : {
      content: content,
      score: rating,
      inputTags: inputTags,
    };
    // console.log(formData);

    if (match && match.params.action === 'write') {
      //리뷰 입력
      httpRequest2(
        'POST',
        `/api/ottReview/add/${ottId}`,
        formData,
        response => {
          alert("입력되었습니다.");
          localStorage.removeItem('movie-title');
          navigate(`/details/${ottId}`);
        },
        error => {
          alert("오류");
          console.error('데이터 전송 오류:', error);
        }
      );
    } else if (match2 && match2.params.action === 'edit') {
      // 리뷰 수정
      httpRequest2(
        'PUT',
        `/api/ottReview/modify/${id}`,
        formData,
        () => {
          alert('리뷰가 수정되었습니다.');
          localStorage.removeItem('movie-title');
          navigate(`/comments/${ottId}/${id}`);
        },
        error => {
          alert('리뷰 수정에 실패했습니다.');
          console.error('리뷰 수정 오류:', error);
        }
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSbumit} className='newboard-form'>
        <h2 className='newboard-texta'>{title}</h2>
        <div>
          <label className='newboard-rating'>평점</label>
          <StarRating onChange={handleRating} initialScore={rating} action={match2 ? match2.params.action : match.params.action} />
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
        <button type='submit' className='newboard-button'>{match2 && match2.params.action === 'edit' ? 'Edit' : 'Save'}</button>
      </form>
    </div>
  );
}