import { useEffect, useRef, useState } from 'react';
import "./Tag.css";
import { matchPath, useMatch } from 'react-router-dom';

const TagList = ({ updateSelectedTags, onUpdateTags }) => {
  const predefinedTags = ['기분이 좋은', '긴장감 넘치는', '신나는', '따뜻한', '시원한 액션',
    'Happy ending', '신비로운', '힐링되는', 'Hero', '재미있는', '흥미진진한',
    '소름돋는', '무서운', '우울한', 'Sad ending', '가슴이 아려오는', '눈물이 나는', '분노 유발'];
  const [selectedTags, setSelectedTags] = useState([]);
  const match = useMatch("/details/:action/:ottId");

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

  //TagInput
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);

  const removeTags = (indexToRemove) => {
    const filter = tags.filter((el, index) => index !== indexToRemove);
    setTags(filter);
  };

  useEffect(() => {
    onUpdateTags(tags); // 태그가 변경될 때마다 업데이트된 태그 전달
  }, [tags, onUpdateTags]);

  const addTags = () => {
    const inputVal = inputRef.current.value;
    if (inputVal !== '' && !tags.includes(inputVal)) {
      setTags([...tags, inputVal]);
      inputRef.current.value = '';
    }
  };
  if(match && match.params.action === 'write') {
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
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span className="tag-close-icon" onClick={() => removeTags(index)}>x</span>
            </li>
          ))}
        </ul>
        <input
          ref={inputRef}
          className="tag-input"
          type="text"
          placeholder="Press button to add tags"
        />
        <button type='button' onClick={addTags}>추가</button>
      </div>
    );
  }
};

export default TagList;
