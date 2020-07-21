import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';


function App() {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

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
                <Link to="/cart/">Cart</Link> 
                {
                    userInfo ? <Link to="/profile"> {userInfo.name} </Link>:
                    <Link to="/signin">Sign In</Link>
                }
               
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
                <Route path="/profile" component={ProfileScreen} />
                <Route path="/orders" component={OrdersScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/products" component={ProductsScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component= {RegisterScreen} />                
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/product/:id" component= {ProductScreen} />                        
                <Route path="/" exact={true} component= {HomeScreen} /> 
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
