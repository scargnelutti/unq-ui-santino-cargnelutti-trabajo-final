import React from 'react';
import "./Card.css"

const Card = ({ card, onClick }) => {
  return (
      <div className="card" onClick={onClick}>
        {card.flipped || card.matched ? card.emoji : '?'}
      </div>
  );
};

export default Card;