import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


function App() {
  return (
  <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button id="buttom">
                    &#9776;
                </button>
                <Link to="/">Shopliest</Link>
            </div>
            <div className="header-links">
                <a href="cart.html">Shoping Cart</a>
                <a href="signing.html">Sing In</a>
            </div>
        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button id="sidebar-close">x</button>
            <ul>
                <li>
                    <a href="indexP.html">Products</a>
                </li>
                <li>
                    <a href="indexP.html">Shorts</a>
                </li>
            </ul>
        </aside>
        <main className="main">
            <div className="content">
                
              <Route path="/" exact={true} component= {HomeScreen} />  
              <Route path="/products/:id" component= {ProductScreen} />                          

            </div>
        </main>
        <footer className="footer">
            All rights reserved.
        </footer>
    </div>
  </BrowserRouter>
  );
}
export default App;
