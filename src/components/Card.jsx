import React from 'react';
import "./Card.css"

const Card = ({ card, onClick }) => {
  return (
      <div onClick={onClick}>
        {card.flipped || card.matched ? card[0] : '?'}
      </div>
  );
};

export default Card;