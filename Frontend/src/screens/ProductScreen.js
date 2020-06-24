import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props){

    //HOOKS
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails; //object deconstructing 
    const dispatch = useDispatch;

    

    useEffect(() =>{
        dispatch(detailsProduct(props.match.params.id));
        return () =>{
            //nothing
        };
        
    }, [])


    return <div>
    <div className="back-to-result">
        <Link to="/">Back to result</Link>    
    </div>  
    { loading? <div> Loading...</div>:
    error? <div> {error} </div>:
    //rendering the content
    (
        <div className="details">
        <div className="details-image">
            <img src={product.image} alt="product"></img>    
        </div>
        <div className="details-info">
            <ul>
                <li>
                    <h4>{product.name}</h4>
                </li>
                <li>
                    Precio:
                    <b>${product.price}</b>
                </li>
                <li>
                    Descripción:
                    <div>
                    {product.description}
                    </div>
                </li>
            </ul>
        </div>
        <div className="details-action">
            <ul> 
                <li>
                Precio: ${product.price}
                </li>
                <li>
                Estado: {product.status}    
                </li>
                <li>
                Cantidad: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                    {[...Array(product.countInStock).keys()].map(x=>
                        <option key= {x+1} value = {x+1}> {x+1} </option>
                        )}
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    </select>   
                </li>
                <li>
                    <button className="button">Add to Cart</button>
                </li>
            </ul>
        </div>
    </div>   
)
}
    </div>

}

export default ProductScreen;