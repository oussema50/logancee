import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import { ADD_TO_CART } from '../redux/constants/cartConstants';
import { deleteProduct } from '../redux/actions/cartActions';
const Cart = ({history}) => {
    const {cart} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const handleGoBackBtn = ()=>{
        history.goBack();
    }
    const handleQuantity = (e,product)=>{
        const cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        :[];
        cart.forEach(cartItem=>{
            if(cartItem._id === product._id){
                cartItem.count = e.target.value
            }
        });
        
        localStorage.setItem('cart',JSON.stringify(cart));
        dispatch({
            type:ADD_TO_CART,
            payload:cart
        })
    }
    const handleDelete = (id)=>{
        dispatch(deleteProduct(id));
    }
    return (
        <section className="cart">
            {cart.length <= 0 ?(
                <div className="cart-banner">
                <div className="cart-banner-desc">
                    <h2>your cart is empty</h2> 
                </div>
                <button className="go-back-btn" onClick={handleGoBackBtn}>go back</button>
            </div>
            ):(
            <>
                <div className="cart-banner">
                    <div className="cart-banner-desc">
                        <h2>shopping cart</h2> 
                    </div>
                </div>
                <div className="container">
                    <div className="cart-content pd-y">
                        <h3 className="cart-content-title">your cart items</h3>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>product</th>
                                    <th>price</th>
                                    <th>quantity</th>
                                    <th>remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(product=>{
                                    
                                  return ( 
                                    <tr key={product._id}>
                                        <td>
                                            <img src={`uploads/${product.productImg}`} alt={product.productName} />
                                        </td>
                                        <td>
                                            <Link  to={`/product/${product._id}`}>
                                                {product.productName}
                                            </Link >
                                            
                                        </td>
                                        <td>
                                            ${product.productPrice}
                                        </td>
                                        <td>
                                            <input type="number"
                                             value={product.count}
                                              min="1" 
                                              max={product.productQuantity} 
                                              onChange={(e)=>handleQuantity(e,product)}
                                            />
                                        </td>
                                        <td>
                                        <button className="delete-btn" onClick={()=>handleDelete(product._id)}>delete</button>
                                        </td>
                                    </tr>)
                                })}
                                
                            </tbody>
                        </Table>
                        <div className="total-price">
                            <h3>total price :</h3>
                            <p>{cart.reduce((totalPrice,cartItem)=> 
                            totalPrice + cartItem.count*cartItem.productPrice,0 ).toFixed(2)}</p>
                        </div>
                        <button className="checkout">proceed to checkout</button>
                    </div>
                </div>
            </>
            )}
        </section>
    )
}

export default Cart
