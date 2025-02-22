import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuItem from './components/MenuItem';
import logo from './logo.svg';

const menuItems = [
  { id: 1, title: 'Gyoza', description: 'Japanese dumplings', imageName: 'gyoza.png', price: 5.99 },
  { id: 2, title: 'Sushi', description: 'Japanese rice rolls', imageName: 'sushi.png', price: 6.99 },
  { id: 3, title: 'Ramen', description: 'Japanese noodle soup', imageName: 'ramen.png', price: 7.99 },
  { id: 4, title: 'Matcha Cake', description: 'Japanese green tea cake', imageName: 'matcha-cake.png', price: 4.99 },
  { id: 5, title: 'Mochi', description: 'Japanese rice cake', imageName: 'mochi.png', price: 3.99 },
  { id: 6, title: 'Yakitori', description: 'Japanese skewered chicken', imageName: 'yakitori.png', price: 2.99 },
  { id: 7, title: 'Takoyaki', description: 'Japanese octopus balls', imageName: 'takoyaki.png', price: 5.99 },
  { id: 8, title: 'Sashimi', description: 'Japanese raw fish', imageName: 'sashimi.png', price: 8.99 },
  { id: 9, title: 'Okonomiyaki', description: 'Japanese savory pancake', imageName: 'okonomiyaki.png', price: 6.99 },
  { id: 10, title: 'Katsu Curry', description: 'Japanese curry with fried pork', imageName: 'katsu-curry.png', price: 9.99 }
];

function App() {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  const addToCart = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart, [id]: (prevCart[id] || 0) + 1 };
      setTotal(calculateTotal(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[id] > 0) {
        newCart[id] -= 1;
        setTotal(calculateTotal(newCart));
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
    setTotal(0);
  };

  const calculateTotal = (cart) => {
    return Object.keys(cart).reduce((sum, id) => {
      const item = menuItems.find((item) => item.id === parseInt(id));
      return sum + item.price * cart[id];
    }, 0);
  };

  const placeOrder = () => {
    const orderedItems = Object.keys(cart).filter((id) => cart[id] > 0);
    if (orderedItems.length === 0) {
      alert('No items in cart');
    } else {
      const orderSummary = orderedItems
        .map((id) => {
          const item = menuItems.find((item) => item.id === parseInt(id));
          return `${item.title} x ${cart[id]}`;
        })
        .join('\n');
      alert(`Order placed!\n\n${orderSummary}\n\nTotal: $${total.toFixed(2)}`);
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="Restaurant Logo" className="logo-img" />
      </div>
      <h1 className="menu-title">Japanese Restaurant Menu</h1>
      <p className="menu-subtitle">Enjoy our delicious selection of authentic Japanese dishes.</p>
      <div className="menu">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imageName={item.imageName}
            price={item.price}
            quantity={cart[item.id] || 0}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      <div className="cart-controls">
        <button className="btn btn-danger" onClick={clearCart}>Clear All</button>
        <button className="btn btn-success" onClick={placeOrder}>Order</button>
      </div>
      <div className="total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default App;