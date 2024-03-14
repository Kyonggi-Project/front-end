import { useState } from 'react';
/*npm install react-icons --save 이거 해야 적용됨*/
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import './Star.css';

export default function StarRating() {
  const [score, setScore] = useState(0);
  const [scoreFixed, setScoreFixed] = useState(score);

  const handleStarEnter = (idx, clientX) => {
    const rect = document.getElementById(`star-${idx}`).getBoundingClientRect();
    const isRightHalf = clientX - rect.left > rect.width / 2;
    const calculatedScore = isRightHalf ? idx + 1 : idx + 0.5;
    setScore(calculatedScore);
  };

  const handleStarClick = () => {
    setScoreFixed(score);
    console.log("점수:", score);
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
      <span className="current-score">{score}</span>
    </div>
  );
}
