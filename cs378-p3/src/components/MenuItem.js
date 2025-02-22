import React from 'react';

const MenuItem = ({ id, title, description, imageName, price, quantity, addToCart, removeFromCart }) => {
  return (
    <div className="menu-item">
      <img src={`/images/${imageName}`} alt={title} className="item-img" />
      <div className="item-info">
        <h3 className="item-title">{title}</h3>
        <p className="item-description">{description}</p>
        <div className="item-footer">
          <span className="item-price">${price.toFixed(2)}</span>
          <div className="quantity-controls">
            <button className="btn btn-secondary" onClick={() => removeFromCart(id)}>-</button>
            <span className="quantity">{quantity}</span>
            <button className="btn btn-secondary" onClick={() => addToCart(id)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;