import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import isEmpty from 'validator/lib/isEmpty';
import {showErrMessage,showSuccessMessage} from './helpers/message';
import {showLoading} from './helpers/loading';

//redux
import {useDispatch,useSelector} from 'react-redux';
import {clearMessages} from '../redux/actions/messageActions';
import{createCategory} from '../redux/actions/categoryActions'
const AdminCategoryModel = (props) => {
    /******************************
    Component States
    *********************************/
    const [category,setCategory] = useState('');
    const [clientSideErrMsg,setClientSideErrMsg] = useState('')
    const {setShowModelCategory,showModelCategory} = props
    /******************************
    redux states
    *********************************/
    const dispatch = useDispatch();
    const {succesMsg,errMsg} = useSelector(state=>state.messages)
    const {loading} = useSelector(state=>state.loading)
    
    const handleInputCategory = (e)=>{
        setCategory(e.target.value);
        dispatch(clearMessages());
        setClientSideErrMsg('')
    }
    const handleCategory = (e)=>{
        e.preventDefault();
      if(isEmpty(category)){
        setClientSideErrMsg('please enter a category');
      }else{
        
        const dataform = {category}
        dispatch(createCategory(dataform));
        setCategory('')
      }
      
    }
   
    const handleCloseCategory = () => {
        setShowModelCategory(false);
        dispatch(clearMessages());
        setClientSideErrMsg('')
        setCategory('')
    }
    
    return(
        <Modal show={showModelCategory} onHide={handleCloseCategory}>
            
            <Form onSubmit={handleCategory} >
                <Modal.Header className="bg-primary text-white">
                <Modal.Title>Add  Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errMsg && showErrMessage(errMsg)}
                    {clientSideErrMsg && showErrMessage(clientSideErrMsg)}
                    {succesMsg && showSuccessMessage(succesMsg)}
                    {loading && showLoading()}
                    <Form.Group className="mb-3" >
                        <Form.Label>category</Form.Label>
                        <Form.Control type="text" value={category} onChange={handleInputCategory} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseCategory}>
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

export default AdminCategoryModel
