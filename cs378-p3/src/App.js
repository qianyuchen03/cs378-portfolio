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

  const addToCart = (id) => {
    setCart((prevCart) => ({ ...prevCart, [id]: (prevCart[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: prevCart[id] > 0 ? prevCart[id] - 1 : 0,
    }));
  };

  const clearCart = () => {
    setCart({});
  };

  const placeOrder = () => {
    const orderItems = Object.entries(cart).filter(([_, qty]) => qty > 0);
    if (orderItems.length === 0) {
      alert('No items in cart');
      return;
    }
    let orderSummary = 'Order placed!\n\n';
    orderItems.forEach(([id, qty]) => {
      const item = menuItems.find((item) => item.id === parseInt(id));
      orderSummary += `${item.title}: ${qty}\n`;
    });
    alert(orderSummary);
  };

  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const item = menuItems.find((item) => item.id === parseInt(id));
      return total + item.price * qty;
    }, 0).toFixed(2);
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
            title={item.title} 
            description={item.description} 
            imageName={item.imageName} 
            price={item.price} 
            count={cart[item.id] || 0}
            add={() => addToCart(item.id)}
            remove={() => removeFromCart(item.id)}
          />
        ))}
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total: ${calculateTotal()}</p>
        <button className="btn btn-danger" onClick={clearCart}>Clear All</button>
        <button className="btn btn-success" onClick={placeOrder}>Order</button>
      </div>
    </div>
  );
}

export default App;
