import { useState, useEffect } from 'react';
/*npm install react-icons --save 이거 해야 적용됨*/
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { useMatch } from 'react-router-dom';
import { useAuth } from '../../util/auth';
import "./Star.css";


export default function StarRating({ onChange, initialScore }) {
  const [score, setScore] = useState(0);
  const [scoreFixed, setScoreFixed] = useState(initialScore || score);

  const [isScoreVisible, setIsScoreVisible] = useState(false);
  const { isLogin, isloginHandler } = useAuth();
  const match = useMatch("/details/:action");

  useEffect(() => {
    if (initialScore) {
      setScore(initialScore);
      setScoreFixed(initialScore);
    }
  }, [initialScore]);

  useEffect(() => {
    if (match.params.action === 'write' || match.params.action === 'edit') {
      setIsScoreVisible(true);
    } else {
      setIsScoreVisible(false);
    }
    
  }, [match.params.action]);

  const handleStarEnter = (idx, clientX) => {
    if (match.params.action === 'write' || match.params.action === 'edit') {
      const rect = document.getElementById(`star-${idx}`).getBoundingClientRect();
      const isRightHalf = clientX - rect.left > rect.width / 2;
      const calculatedScore = isRightHalf ? idx + 1 : idx + 0.5;
      setScore(calculatedScore);
    }
  };

  const handleStarClick = (event) => {
    if (!isLogin) {
      isloginHandler(event);
    }
    else {
      setScoreFixed(score);
      if (onChange) {
        onChange(score); // 점수를 변경 시 부모 컴포넌트로 전달
      }
      console.log("점수:", score);
    }
  };

  const handleStarLeave = () => {
      if (score !== scoreFixed) {
        setScore(scoreFixed);
      }
  };

  return (
    <div className="star-rating-container" onMouseLeave={handleStarLeave}>
      {Array(5).fill(0).map((_, idx) => (
        <div key={idx} className="star-container">
          <div
            id={`star-${idx}`}
            className="star-event"
            onMouseEnter={(e) => handleStarEnter(idx, e.clientX)}
            onClick={handleStarClick}
          >
            {score - Math.floor(score) === 0.5 && Math.floor(score) === idx ? (
              <BsStarHalf className="star" />
            ) : idx + 1 <= score ? (
              <BsStarFill className="star" />
            ) : (
              <BsStar className="star" />
            )}
          </div>
        </div>
      ))}
      {isScoreVisible &&
        <span className="current-score">{score}</span>
      }
    </div>
  );
}
