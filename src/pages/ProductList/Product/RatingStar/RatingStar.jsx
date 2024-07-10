import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'

const RatingStars = ({ score, maxScore = 5, className = '' }) => {
  const fullStars = Math.floor(score);
  const hasHalfStar = score - fullStars >= 0.5;

  return (
    <div className={`rating-stars ${className}`} tabIndex="0" aria-label={`${score} out of ${maxScore} stars`} role="button" style={{
      borderColor: 'rgb(4, 106, 56)'
    }}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <span key={index} className="star full" style={{
          color: 'rgb(4, 106, 56)',
        }}>
          <FontAwesomeIcon icon={faStar} />
        </span>
      ))}
      {hasHalfStar && (
        <span className="star half" style={{
          color: 'rgb(4, 106, 56)',
        }}>
          <FontAwesomeIcon icon={faStarHalfAlt} />
        </span>
      )}
      {Array.from({ length: maxScore - fullStars - (hasHalfStar ? 1 : 0) }).map((_, index) => (
        <span
          key={index + fullStars + (hasHalfStar ? 1 : 0)}
          className="star empty"
          style={{
            color: 'rgb(4, 106, 56)',
            opacity: '0.3',
          }}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
      ))}
    </div>
  );
};

export default RatingStars;