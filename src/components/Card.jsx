import React from 'react';

const Card = ({ card, onClick }) => {
  return (
      <div className="card" onClick={onClick}>
        {card.flipped || card.matched ? card.emoji : '?'}
      </div>
  );
};

export default Card;