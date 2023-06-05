import React from 'react';
import './Rating.style.css'; // Importa el archivo CSS con los estilos

const Rating = ({ value }) => {
  const getStarIcon = (index) => {
    if (value >= index + 1) {
      return <i className="fas fa-star"></i>; // Estrella completa si el valor del rating es mayor o igual al índice + 1
    } else if (value >= index + 0.5) {
      return <i className="fas fa-star-half-alt"></i>; // Media estrella si el valor del rating es mayor o igual al índice + 0.5
    } else {
      return <i className="far fa-star"></i>; // Estrella vacía si el valor del rating es menor al índice + 0.5
    }
  };

  return (
    <div className="rating">
       <span className='rating-label'>Rating:</span> 
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index}>{getStarIcon(index)}</span>
      ))}
    </div>
  );
};

export default Rating;