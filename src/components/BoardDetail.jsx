import { useEffect, useState } from 'react';
import './BoardDetail.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function BoardDetail() {

  const [details, setDetails] = useState();
  const { id } = useParams();

  useEffect(() => {
    // 게시글 정보를 가져오는 함수
    const fetchPost = async () => {
      try {
        const response = await axios.get(/*백엔드 url*/`http://localhost:8080/board/${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error('게시글 정보를 가져오는데 실패했습니다:', error);
      }
    };

    fetchPost();
  }, [id]);

  //임시 데이터
  const details_dummy = {
    title: '제목',
    content: '내용',
  }

  return (
    <div className='board_details'>
      <p className='text'>Title</p>
      <p className='text-box'>{details_dummy.title}</p>
      <p className='text'>Content</p>
      <p className='text-box'>{details_dummy.content}</p>
      <button className='buttons'>Edit</button>
      <button className='buttons'>Delete</button>
    </div>
  );
}