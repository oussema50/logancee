import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; 
import { deleteProduct } from '../redux/actions/productActions';
const AdminProductsCard = () => {
    const {products} = useSelector(state => state.products);
    const dispatch = useDispatch();
    
    return (
    <>
        <div className="section-title">
            <h2>Products</h2>
        </div>
        {products &&
            <div className="admin-body-product">
                { products.map((product)=>{
                return (
                
                <div className="admin-product-card" key={product._id}>
                    <Card >
                        <Card.Img className="product-card-img" variant="top" src={`/uploads/${product.productImg}`} />
                        <Card.Body>
                            <Card.Title className="product-card-title">{product.productName}</Card.Title>
                            
                            <hr/>
                            <h3 className="product-card-price">$ {product.productPrice}</h3>
                            <hr/>
                            <div className="product-card-btn">
                                <Link to={`/admin/edit/product/${product._id}`} variant="primary">edit</Link>
                                <Button onClick={()=>dispatch(deleteProduct(product._id))} variant="secondary">delete</Button>
                            </div>
                        </Card.Body>
                        
                    </Card>
                </div>              
            )
            })}
            </div>
        }
    </>
    )
}

export default AdminProductsCard
