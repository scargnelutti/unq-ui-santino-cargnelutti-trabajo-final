import React from 'react';

const Card = ({ content }) => {
  return (
      <div onClick={() => console.log("Pasé aca")}>
        {content}
      </div>
  );
};

export default Card;