import React,{useState,useEffect} from 'react';
//redux
import { useDispatch } from 'react-redux';
import {getProducts} from '../redux/actions/productActions';
import {getCategories} from '../redux/actions/categoryActions'
//componant
import AdminCategoryModel from './AdminCategoryModel';
import AdminProductModel from './AdminProductModel';
import AdminBody from './AdminBody';
const AdminDashboard  = (props) => {
    const dispatch = useDispatch(); 

    useEffect(()=>{
      dispatch(getCategories())
    },[dispatch]);

    useEffect(()=>{
        dispatch(getProducts());
      },[dispatch]);
    const {toggleAdminMenu} = props;
    
    
    /* Category Model state and function */

    const [showModelCategory, setShowModelCategory] = useState(false);
    const handleShowCategory = ()=>setShowModelCategory(true)

    /* Product Model state and function */
    const [showModelProduct, setShowModelProduct] = useState(false);
    const handleShowProduct = () => setShowModelProduct(true);

    // admin content
    const admincontent = ()=>{
        return(
         <div className="admin-buttons">
             <button onClick={handleShowCategory}>
                 <span>add  category</span>
                 <i className="fa fa-plus" aria-hidden="true"></i>
             </button>
             <button onClick={handleShowProduct}>
                 <span>add product</span>
                 <i className="fa fa-plus" aria-hidden="true"></i>
             </button>
             <button>
                 <span>view order</span>
                 <i className="fa fa-eye" aria-hidden="true"></i>
             </button>
         </div>
        )
     }
    return (
        <div className="admin-dashboard">
            {toggleAdminMenu?
                <div className="admin-content active">
                    {admincontent()}
                    <AdminBody />
                    
                </div>:
                <div className="admin-content">
                    {admincontent()}
                    <AdminBody />
                </div>
            }
            <AdminCategoryModel 
            setShowModelCategory={setShowModelCategory}
            showModelCategory={showModelCategory}
            />
            <AdminProductModel
            setShowModelProduct={setShowModelProduct}
            showModelProduct={showModelProduct} />
        </div>
    )
}

export default AdminDashboard 
