import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props){

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');

    
    const userRegister = useSelector(state=> state.userRegister);
    const { loading, userInfo, error} = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/'; 


    const submitHandler= (e) =>{
        e.preventDefault();
        dispatch(saveShipping({address, city, state, municipality, shippingMethod}));
        props.history.push('payment')
    }
    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Dirección de envio</h2>
                </li>
                <li>
                    <label htmlFor="address">Dirección</label>
                    <input type="name" name="address" id="address" onChange={(e)=> setAddress(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="state">Estado</label>
                    <input type="name" name="state" id="state" onChange={(e)=> setState(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="city">Ciudad</label>
                    <input type="name" name="city" id="city" onChange={(e)=> setCity(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="municipality">Municipio</label>
                    <input type="name" name="municipality" id="municipality" onChange={(e)=> setMunicipality(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="address">Método de entrega</label>
                    <input type="name" name="shippingMethod" id="shippingMethod" onChange={(e)=> setShippingMethod(e.target.value)}></input>
                </li>

                <li>
                <button type="submit" className="button primary">Continuar</button>
                </li>

            </ul>
        </form>
    </div>
    </div>
    
}

export default ShippingScreen;