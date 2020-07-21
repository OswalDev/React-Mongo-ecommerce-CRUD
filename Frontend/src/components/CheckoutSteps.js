import React from 'react';

function CheckoutSteps(props){
    return <div className="checkout-steps">
        <div className={props.step1 ? 'active' : ''}>Inicia Sesión</div>
        <div className={props.step2 ? 'active' : ''}>Datos de envio</div>
        <div className={props.step3 ? 'active' : ''}>Método de pago</div>
        <div className={props.step4 ? 'active' : ''}>Culminar pedido</div>
    </div>

}

export default CheckoutSteps;