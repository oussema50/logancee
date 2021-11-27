import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
/******************************
    Redux Action
*********************************/
import { getProduct } from '../redux/actions/productActions';
import { getCategories } from '../redux/actions/categoryActions';
const AdminEditProduct = (props) => {
    /******************************
    Redux State
    *********************************/
    const dispatch = useDispatch();

    const {product} = useSelector(state=>state.products)
    const {categories} = useSelector(state => state.categories)
    
    /******************************
    Component States and props
    *********************************/
    const {toggleAdminMenu,match,history} = props;
    const [productImg,setProductImg] = useState(null);
    const [productName,setProductName] = useState('')
    const [productDesc,setProductDesc] = useState('')
    const [productPrice,setProductPrice] = useState('')
    const [productCategory,setProductCategory] = useState('')
    const [productQuantity,setProductQuantity] = useState('')

    /******************************
    Component Prams
    *********************************/

    const productId = match.params.productId

    /******************************
    LIFECYCLE METHOD
    **********************************/
    useEffect(()=>{
        if(!product){
            dispatch(getProduct(productId))
            dispatch(getCategories());
        }else{
            setProductImg(product.productImg);
            setProductName(product.productName);
            setProductDesc(product.productDesc);
            setProductPrice(product.productPrice);
            setProductCategory(product.productCategory);
            setProductQuantity(product.productQuantity);
        }
    },[dispatch,product,productId])

    const handleProductImg = (e)=>{
        setProductImg(e.target.files[0]);
    }

    const handleUpdateProduct = async (e)=>{
        e.preventDefault();

        let formData = new FormData();
        formData.append('productImg',productImg);
        formData.append('productName',productName);
        formData.append('productDesc',productDesc);
        formData.append('productPrice',productPrice);
        formData.append('productCategory',productCategory);
        formData.append('productQuantity',productQuantity);
        const config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        await axios.put(`/api/product/${productId}`,formData,config)
        .then(response=>{
            history.push('/admin/dashboard');
        }).catch(err=>{
            console.log('err from api product update : ', err);
        })

    }

    const editForm = ()=>{
    return  <Form onSubmit={handleUpdateProduct} >
            <Row>
                <Col  md={6} xs={12}>
                    <Form.Group className="mb-3" >
                        <Form.Label>choose file: </Form.Label>
                        <Form.Control type="file" name="productImg"  onChange={handleProductImg} />
                    </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                    <Form.Group className="mb-3" >
                        <Form.Label>name:</Form.Label>
                        <Form.Control type="text" value={productName} name="productName" onChange={(e)=>setProductName(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            
            <Row>
                <Col md={6} xs={12}>
                    <Form.Group className="mb-3" >
                        <Form.Label>description:</Form.Label><br/>
                        <Form.Control name="productDesc" value={productDesc} as="textarea" rows={3} onChange={(e)=>setProductDesc(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                    <Form.Group className="mb-3" >
                        <Form.Label>price:</Form.Label>
                        <Form.Control name="productPrice" value={productPrice} type="text"  onChange={(e)=>setProductPrice(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            
            
            <Row>
                <Col md={6} xs={12}>
                    <Form.Group className="mb-3" >
                        <Form.Label>category:</Form.Label>
                        <Form.Select name="productCategory"  onChange={(e)=>setProductCategory(e.target.value)}>
                            <option value="">choose one...</option>
                            {categories && categories.map(item=>
                                <option key={item._id} value={item._id}>{item.category}</option>
                                )}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                    <Form.Group className="mb-3" >
                        <Form.Label>quantity:</Form.Label>
                        <Form.Control value={productQuantity} name="productQuantity" type="number" min="0" max="1000" onChange={(e)=>setProductQuantity(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            
            <Button type="submit" variant="primary" >
                Submit
            </Button>
        </Form> 
    }
    return (
        <div className="admin-edit">
            {toggleAdminMenu?
                <div className="admin-edit-content active">                   
                    {editForm()}
                </div>:
                <div className="admin-edit-content">
                    {editForm()}
                </div>
            }
            
        </div>
    )
}

export default AdminEditProduct
