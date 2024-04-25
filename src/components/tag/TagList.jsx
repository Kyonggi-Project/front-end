import { useEffect, useState } from 'react';
import "./Tag.css";

const TagList = ({ updateSelectedTags }) => {
  const predefinedTags = ['React', 'JavaScript', 'HTML', 'CSS'];
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((selectedTag) => selectedTag !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  useEffect(() => {
    // 업데이트된 태그를 부모 컴포넌트로 전달
    updateSelectedTags(selectedTags);
  }, [selectedTags, updateSelectedTags]);

  return (
    <div className="tags-input-container">
      <ul id="tags">
        {predefinedTags.map((tag, index) => (
          <li
            key={index}
            className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            <span className="tag-title">{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
