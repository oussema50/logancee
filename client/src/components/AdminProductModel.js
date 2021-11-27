import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import isEmpty from 'validator/lib/isEmpty';
import {showErrMessage,showSuccessMessage} from './helpers/message';
import {showLoading} from './helpers/loading';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//redux
import {useDispatch,useSelector} from 'react-redux';
import {clearMessages} from '../redux/actions/messageActions';
import { createProduct } from '../redux/actions/productActions';
const AdminProductModel = (props) => {
    
    /******************************
    redux states
    *********************************/
    const dispatch = useDispatch();
    const {succesMsg,errMsg} = useSelector(state=>state.messages);
    const {loading} = useSelector(state=>state.loading);
    const {categories} = useSelector(state=>state.categories)
    /******************************
    component stats and props
    *********************************/
    const {showModelProduct,setShowModelProduct} = props;
    const [clientSideErrMsg,setClientSideErrMsg] = useState('')
    const [formProductData,setFormProductData] = useState({
        productImg:null,
        productName:'',
        productDesc:'',
        productPrice:'',
        productCategory:'',
        productQuantity:''
    });
    const{productImg,productName,productDesc,productPrice,productCategory,productQuantity} = formProductData

    
    const handleCloseProduct = () => {
        setShowModelProduct(false);
        dispatch(clearMessages());
        setClientSideErrMsg('');
        setFormProductData({
            productImg:null,
            productName:'',
            productDesc:'',
            productPrice:'',
            productCategory:'',
            productQuantity:''
        })
    }
    

    const handleProductImg = (e) =>{
        console.log(e.target.files[0])
        setFormProductData({
            ...formProductData,
            [e.target.name]:e.target.files[0]
        });
        dispatch(clearMessages());
    }
    const handleInputProduct = (e)=>{
        setFormProductData({
            ...formProductData,
            [e.target.name]:e.target.value
        });
        dispatch(clearMessages());
        setClientSideErrMsg('')
    }
    const handleProduct = (e)=>{
        e.preventDefault();
        if(productImg === null){
            setClientSideErrMsg('Please select an image');
        }else if(isEmpty(productName) || isEmpty(productDesc) || isEmpty(productPrice) ){
            setClientSideErrMsg('all fields are required');
        }else if(isEmpty(productCategory)){
            setClientSideErrMsg('Please select a category');
        }else if(isEmpty(productQuantity)){
            setClientSideErrMsg('Please select a quantity');
        }else{
            
            let formData = new FormData();
            formData.append('productImg',productImg)
            formData.append('productName',productName)
            formData.append('productDesc',productDesc)
            formData.append('productPrice',productPrice)
            formData.append('productCategory',productCategory)
            formData.append('productQuantity',productQuantity)
            dispatch(createProduct(formData));
            setFormProductData({
                productImg:null,
                productName:'',
                productDesc:'',
                productPrice:'',
                productCategory:'',
                productQuantity:''
            })
        }
    }
    return(
        <Modal show={showModelProduct} onHide={handleCloseProduct}>
            <Form onSubmit={handleProduct} >
                <Modal.Header  className="bg-primary text-white">
                <Modal.Title>Add  Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clientSideErrMsg && showErrMessage(clientSideErrMsg)}
                    {errMsg && showErrMessage(errMsg)}
                    {succesMsg && showSuccessMessage(succesMsg)}
                    {loading && showLoading()}
                    
                    <Form.Group className="mb-3" >
                        <Form.Label>choose file </Form.Label>
                        <Form.Control type="file" name="productImg"  onChange={handleProductImg} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>name</Form.Label>
                        <Form.Control type="text" value={productName} name="productName" onChange={handleInputProduct} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>description</Form.Label><br/>
                        <Form.Control name="productDesc" value={productDesc} as="textarea" rows={3} onChange={handleInputProduct} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>price</Form.Label>
                        <Form.Control name="productPrice" value={productPrice} type="text"  onChange={handleInputProduct} />
                    </Form.Group>
                    <Row>
                        <Col sm={6} xs={12}>
                            <Form.Group className="mb-3" >
                                <Form.Label>category</Form.Label>
                                <Form.Select name="productCategory"  onChange={handleInputProduct}>
                                    <option value="">choose one...</option>
                                    {categories && categories.map(item=>
                                        <option key={item._id} value={item._id}>{item.category}</option>
                                        )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={6} xs={12}>
                            <Form.Group className="mb-3" >
                                <Form.Label>quantity</Form.Label>
                                <Form.Control value={productQuantity} name="productQuantity" type="number" min="0" max="1000" onChange={handleInputProduct} />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseProduct}>
                    Close
                </Button>
                <Button type="submit" variant="primary" >
                    Submit
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AdminProductModel
