// PopupCard.jsx

import React from 'react';
import successImage from '../assets/success.jpg';
import failureImage from '../assets/failure.jpg.webp';
import './PopupCard.css'; // Update with your CSS for PopupCard styling

const PopupCard = ({ isSuccess }) => {
  return (
    <div className="popup-card">
      <div className="popup-content">
        <img src={isSuccess ? successImage : failureImage} alt={isSuccess ? 'Success' : 'Failure'} />
        <h2>{isSuccess ? 'Validation Successful!' : 'Validation Failed!'}</h2>
        <p>{isSuccess ? 'You have been successfully validated.' : 'Sorry, validation failed. Please try again.'}</p>
      </div>
    </div>
  );
};

export default PopupCard;
