import React from 'react';

const MenuItem = ({ title, description, imageName, price }) => {
  return (
    <div className="menu-item">
      <img src={`/images/${imageName}`} alt={title} className="item-img" />
      <div className="item-info">
        <h3 className="item-title">{title}</h3>
        <p className="item-description">{description}</p>
        <div className="item-footer">
          <span className="item-price">${price.toFixed(2)}</span>
          <button className="btn btn-primary btn-add">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
