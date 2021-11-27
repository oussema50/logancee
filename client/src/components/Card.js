import React from 'react'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { addToCart } from '../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
const Card = (props) => {
    const {product} = props;
    const dispatch = useDispatch();
    const handleAddToCart = ()=>{
        dispatch(addToCart(product));
    }
    return (
        <div className="product-item-card our-product-card">
            <div className="product-card-img">
                <img className="product-item-img" src={`uploads/${product.productImg}`} alt={product.productName} />
                <i className="fa fa-plus" onClick={handleAddToCart} aria-hidden="true"></i>
            </div>
            <div className="product-item-desc">
                <h3>{product.productName}</h3>
                <span className = "product-item-price">${product.productPrice}</span>
                <div className="product-item-icon">
                    <Button className="add-cart" disabled={product.productQuantity <= 0} onClick={handleAddToCart}>add to cart</Button>
                    <Link className="view-product" to={`/product/${product._id}`}>view product</Link >
                </div>
            </div>
            
        </div> 
    )
}

export default Card
