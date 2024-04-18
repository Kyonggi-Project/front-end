import { useState } from 'react';
import './Tag.css';

const TagList = ({ addTags }) => { // addTags 함수를 props로 받음
  // 미리 정의된 태그 목록
  const predefinedTags = ['React', 'JavaScript', 'HTML', 'CSS'];

  // 선택된 태그 목록을 관리할 상태
  const [selectedTags, setSelectedTags] = useState([]);

  // 태그를 선택하는 함수
  const toggleTag = (tag) => {
    // 이미 선택된 태그라면 제거, 아니면 추가
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 선택된 태그들을 콘솔에 출력하는 함수
  const logSelectedTags = () => {
    console.log('Selected tags:', selectedTags);
    addTags(selectedTags); // 선택된 태그들을 부모 컴포넌트로 전달
  };

  return (
    <div className="tags-input-container">
      <ul id="tags">
        {/* 미리 정의된 태그 목록을 매핑하여 보여줌 */}
        {predefinedTags.map((tag, index) => (
          <li key={index} className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`} onClick={() => toggleTag(tag)}>
            <span className="tag-title">{tag}</span>
          </li>
        ))}
      </ul>
      {/* 선택된 태그들을 콘솔에 출력하는 버튼 */}
      <button type='button' onClick={logSelectedTags}>선택된 태그 콘솔에 출력</button>
    </div>
  );
};

export default TagList;
