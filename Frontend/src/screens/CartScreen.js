import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';



function CartScreen(props){

    //Access from redux-store
    const cart= useSelector(state => state.cart);
    const { cartItems } = cart;

    const productId= props.match.params.id;
    const qty= props.location.search? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();
    const removeFromCartHandler= (productId) =>{
        dispatch(removeFromCart(productId));
    }

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    }, []); //the empty array only means that this will only render after rendering has finished

    const checkoutHandler= ()=>{
        props.history.push("/signin?redirect=shipping");
    }

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping cart
                    </h3>
                    <div>
                        Price
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
                                Cantidad: 
                                <select value={item.qty} onChange={(e)=> dispatch(addToCart( item.product, e.target.value))}>
                                {[...Array(item.qtyPerTime).keys()].map(x=>
                                <option key= {x+1} value = {x+1}> {x+1} </option>
                                )}
                                </select>
                                <button type="button" className="button primary" onClick={()=> removeFromCartHandler(item.product)}>
                                    Eliminar
                                </button>
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
        <div className="cart-action">

            <h3>
                subtotal ({cartItems.reduce((a,c)=> a + c.qty, 0)} items)
                :
                $ {cartItems.reduce((a,c)=> a + c.price * c.qty, 0)} 
            </h3>
            <button onClick={checkoutHandler} className="button primary" disabled= {cartItems.length === 0}>
                Proceder a verificar
            </button>

        </div>

    </div>
}

export default CartScreen;