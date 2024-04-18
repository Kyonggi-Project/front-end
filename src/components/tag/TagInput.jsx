import { useState, useRef } from 'react';
import './Tag.css';

const TagInput = ({ addTag }) => { // addTag를 props로 받음

  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);

  const removeTags = (indexToRemove) => {
    const filter = tags.filter((el, index) => index !== indexToRemove);
    setTags(filter);
  };

  const addTags = () => {
    const inputVal = inputRef.current.value;
    if (inputVal !== '' && !tags.includes(inputVal)) {
      setTags([...tags, inputVal]);
      inputRef.current.value = '';
      addTag(inputVal); // 입력한 태그를 부모 컴포넌트로 전달
    }
  };

  return (
    <>
      <div className="tags-input-container">
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
    </>
  );
};

export default TagInput;
