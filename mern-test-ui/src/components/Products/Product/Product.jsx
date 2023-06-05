import React from 'react';
import Rating from '../../Rating';

const Product = ({ product, handleAddToCart }) => {

  const descriptionFormatted = () => {
    return product.description.length > 80 ? product.description.slice(0, 80) + '...' : product.description;
  }

  const titleFormatted = () => {
    return product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title;
  }

  return (
    <div className="Products-item">
      <img src={product.image} alt={product.title} />
      <div className="Products-item-info">
        <h2 className='tooltip'>
          {titleFormatted()}
          <span class="tooltip-text">{product.title}</span>
          <span>
            ${product.price}
          </span>
        </h2>
        <div className='Product-item__description'>
          <span className='category-span'>
            {product.category}
          </span>
          <Rating value={product.rating.rate} />
        </div>
        <p className='tooltip-description'>{descriptionFormatted()}
          <span class="tooltip-description-text">{product.description}</span>
        </p>
      </div>
      <button type="button" onClick={handleAddToCart(product)}>Add to cart</button>
    </div>
  )
};

export default Product;
