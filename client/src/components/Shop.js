import React,{useEffect,useState} from 'react'
import Card from './Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
/************************
 Redux  
**************************/
import { useDispatch,useSelector } from 'react-redux';
import {getCategories} from '../redux/actions/categoryActions';
import {getProducts} from '../redux/actions/productActions';
import {getProductsByFilter} from '../redux/actions/filterActions'
const Shop = () => {
    const [searchName,setSearchName] = useState('');
    const [categoryIds,setCategoryIds] = useState([]);
    const dispatch = useDispatch();
    const {categories} = useSelector(state=>state.categories);
    const {products} = useSelector(state=>state.products);
    useEffect(()=>{
        dispatch(getCategories());
    },[dispatch]);
    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch]);
    const handleSearchInput = (e)=>
    {
       
        setCategoryIds([]);
        setSearchName(e.target.value);
    }
    
    const handleCategory =  (e)=>{
        
        const categoryChecked = e.target.value;
        const allCategoriesChecked = [...categoryIds];
        const indexFound = allCategoriesChecked.indexOf(categoryChecked);
        let updateCategoryIds;
        if(indexFound === -1){
            updateCategoryIds = [...categoryIds,categoryChecked]
            setCategoryIds(updateCategoryIds)
        }else{
            updateCategoryIds = [...categoryIds]
            updateCategoryIds.splice(indexFound,1)
            setCategoryIds(updateCategoryIds)
        }
        console.log(updateCategoryIds);
        dispatch(getProductsByFilter({type:'category',query:updateCategoryIds}))
        
    }
   

    useEffect(()=>{
        dispatch(getProductsByFilter({type:'text',query:searchName}))

    },[searchName]);

    
    return (
        <section className="shop">
            
            <div className="shop-banner">
                <img src="/imgs/shop-banner.jpg" />
                <div className="shop-banner-desc">
                    <h2>welcome to our shop</h2> 
                </div>
            </div>
            
            
            <Row className="shop-content pd-y">
                <Col xs={12}  md={4} lg={3}>
                    <div className="shop-filter">
                        <div className="filter-category">
                            <h3 className="filter-title">filter</h3>
                            <form className="category-list">
                                {categories && categories.map((category=>{
                                   return <Form.Check 
                                   className="category-list-item"
                                   value={category._id}
                                    checked={categoryIds.includes(category._id)}
                                    type="checkbox"
                                    key={category._id}
                                    id={category._id}
                                    label={category.category} 
                                    onChange={handleCategory}
                                  />
                                     
                                }))}
                            </form>
                        </div>
                        <div className="filter-name">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input type="text" placeholder="search..." value={searchName} onChange={handleSearchInput} />
                        </div>
                    </div>
                </Col>
                <Col xs={12}  md={8} lg={9}>
                    <div className="shop-products">
                        {products && products.map(product=>{
                            return(
                                <Card key={product._id} product={product} />
                            )
                        })}
                    </div>
                </Col>
            </Row>
            
            
            
            
          
        </section>
    )
}

export default Shop
