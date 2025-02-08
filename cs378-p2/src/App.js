import React from 'react';
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
          />
        ))}
      </div>
    </div>
  );
}

export default App;
