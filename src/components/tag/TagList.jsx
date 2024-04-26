import { useEffect, useRef, useState } from 'react';
import "./Tag.css";

const TagList = ({ updateSelectedTags, onUpdateTags }) => {
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
};

export default TagList;
