import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen(props){

    //Access from redux-store
    const cart= useSelector(state => state.cart);
    const orderCreate = useSelector(state=>state.orderCreate);
    const { loading, success, error, order}= orderCreate;
    const { cartItems,shipping, payment } = cart;
    
    if(!shipping.address){
        props.history.push("/shipping");
    }else if(!payment.paymentMethod){
        props.history.push("/payment");
    }

    const itemsPrice = cartItems.reduce((a,c) => a + c.price*c.qty, 0);
    const shippingPrice = cartItems > 100 ? 0 : 10;
    const taxPrice =0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice;

    const dispatch = useDispatch();

    const PlaceOrderHandler= () =>{
        //create an order
        dispatch(createOrder({orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice}));  
    }
    useEffect(()=>{
        if(success){
            props.history.push("/order/" + order.__id);
        }
    }, [success]);

    return <div>
    <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>   
    
    <div className="placeorder">
        <div className="placeorder-info">
            <div>
                <h3>Shipping</h3>
                <div>
                    {cart.shipping.address},{cart.shipping.city},
                    {cart.shipping.state},{cart.shipping.municipality},
                    {cart.shipping.shippingMethod}
                </div>
            </div>
            <div>
                <h3>Pago</h3>
                <div>
                    Método de pago: {cart.payment.paymentMethod}
                </div>
            </div>
            <div>
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Carrito de compras
                    </h3>
                    <div>
                        Precio
                    </div>
                </li>
                {
                    cartItems.length === 0 ?
                    <div>
                        El carrito está vacío.
                    </div>
                    :
                    cartItems.map(item =>
                        <li>
                            <div className="cart-image">
                            <img src={item.image} alt="product"/>
                            </div>
                            <div className="cart-name">
                                <div>
                                <Link to={"/products/"+ item.product}>
                                {item.name}
                                </Link>    
                                </div>
                                <div>
                                Cantidad: {item.qty}
                                </div>    
                            </div>
                            <div className="cart-price" >
                                ${item.price}
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>

        </div>
        <div className="placeorder-action">
            <ul>
                <li>
                <button className="button primary full width" onClick={PlaceOrderHandler}>Realizar compra</button>
                </li>
                <li>
                    <h3>Resumen del pedido</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                </li>
                <li>
                    <div>Total</div>
                    <div>${totalPrice} </div>

                </li>
            </ul>




        </div>

    </div>
    </div>
}

export default PlaceOrderScreen;