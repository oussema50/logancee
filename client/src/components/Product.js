import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getProduct} from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Product = ({match,history}) => {
    const {productId} = match.params;
    const dispatch = useDispatch();
    const {product} = useSelector(state=>state.products);

    useEffect(()=>{
        dispatch(getProduct(productId));
    },[dispatch]);

    const handleAddToCart = ()=>{
        dispatch(addToCart(product));
    }
    return (
        <section className="product">
            <div className="shop-banner">
                <img src="/imgs/shop-banner.jpg" />
                <div className="shop-banner-desc">
                    <h2>simple product</h2> 
                </div>
            </div>
            <div className="container">
                <div className="product-content pd-y">
                    {product && 
                        <Row>
                            <Col xs={12} sm={5} lg={5} >
                                <div className="product-img">
                                    <img src={`/uploads/${product.productImg}`} />
                                </div>
                            </Col>
                            <Col xs={12} sm={7} lg={7} >
                                <div className="product-desc">
                                    <h3>{product.productName}</h3>
                                    <p className="price">${product.productPrice}  </p>
                                    <p className="status"> <strong>status :</strong> {product.productQuantity <= 0? <span style={{color:"#fe0000"}}>Out Of Stock</span>:<span style={{color:"#98cb00"}}>In Stock</span>} </p>
                                    <hr/>
                                    <p className="description"><strong>Description : </strong><br/>{product.productDesc}</p>
                                    <hr/>
                                    <div className="product-submit">
                                    <Button className="add-cart" disabled={product.productQuantity <= 0} onClick={handleAddToCart} >add to cart</Button>
                                    
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        
                    }
                </div>
            </div>
        </section>
    )
}

export default Product
