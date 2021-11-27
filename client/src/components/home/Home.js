import React,{useEffect} from 'react';
import {Link} from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import {showLoading} from '../helpers/loading';
import Card from '../Card'
/******************************
 Redux Method And Actions
 *********************************/
 import {useDispatch,useSelector} from 'react-redux';
import {getNewArrivals} from '../../redux/actions/filterActions';
import {getProductsByCount} from '../../redux/actions/productActions'
const Home = () => {
    /******************************
    Redux states
    *********************************/
    const {newArrivals} = useSelector(state=>state.filters);
    const {products} = useSelector(state=>state.products);
    const {loading} = useSelector(state=>state.loading);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getNewArrivals());
    },[dispatch]);
    useEffect(()=>{
        dispatch(getProductsByCount());
    },[dispatch]);
    return (
    <section className="home">
        {loading?showLoading():
        <>
            <Carousel>
                <Carousel.Item interval={5000}>
                    <img
                    className="d-block w-100 carousel-img"
                    src="imgs/slide1.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                    className="d-block w-100 carousel-img"
                    src="imgs/slide2.jpg"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
        
            </Carousel>
            <div className="container">
                <section className="new-arrivals pd-y" >
                    <div className="section-title">
                        <h3 className="title">New Arrivals</h3>
                        <p className="section-subtitle">Visit our shop to see amazing creations from our designers.</p>
                    </div>
                    {newArrivals &&
                        <div className="product-item ">
                            { newArrivals.map((product)=>{
                            return (
                                <Card key={product._id} product={product}/>
                            )
                            })}
                            
                        </div>
                    }

                </section>
            </div>
            <section className="our-products pd-y">
                <div className="container">
                    <div className="section-title">
                        <h3 className="title">check our product</h3>
                        <p className="section-subtitle">Visit our shop to see amazing creations from our designers.</p>
                    </div>
                    {products &&
                        <div className="product-item ">
                            { products.map((product)=>{
                            return (
                                <Card key={product._id} product={product}/>
                            )
                            })}
                            
                        </div>
                    }
                    <Link className="our-products-btn" to="/shop">go to the shop</Link>
                </div>
            </section>
        </>
        }
    </section>
    )
}

export default Home
