import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import { isAuthentication,logOut } from './helpers/auth';
const NavBar = ({history,...props}) => {
    const {cart} = useSelector(state=>state.cart);
    const {toggleAdminMenu,setToggleAdminMenu} = props
    const [toggleMenu,setToggleMenu] = useState(false);
    const [toggleUser,setToggleUser] = useState(false)
    const [toggleCart,setToggleCart] = useState(false);
    let totalPrice = 0;
    const handleMenu = () =>{
        setToggleMenu(!toggleMenu)
        setToggleUser(false);
    }
    const handleAdminMenu = () =>{
        setToggleAdminMenu(!toggleAdminMenu);
    }
    const handleUser = () =>
    {
        setToggleUser(!toggleUser);
        setToggleMenu(false)
    }
    const handelLogout = (even)=>{
        logOut(()=>{
            history.push('/signin')
        });
    }
    const handleShoppingCart = ()=>{
        setToggleCart(!toggleCart);
    }
    return (
        <nav className="navBar">
            <div className="container">
                {(!isAuthentication() || (isAuthentication() && isAuthentication().role ===0 )) &&
                <div className="navBarContent nav-user">
                    <div className="logo">
                        <Link className="logoLink" to="/">logancee</Link>
                    </div>
                    {toggleMenu?
                        <ul className="navList active">
                            <li>
                                <Link className="link" to="/" onClick={handleMenu}>
                                    home
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/about" onClick={handleMenu}>
                                    about
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/shop" onClick={handleMenu}>
                                    shop
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/cart" onClick={handleMenu}>
                                    cart
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/portfolio" onClick={handleMenu}>
                                    portfolio
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/blog" onClick={handleMenu}>
                                    blog
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/contact" onClick={handleMenu}>
                                    contact
                                </Link>
                            </li>
                        </ul>:
                        <ul className="navList">
                            <li>
                                <Link className="link" to="/" onClick={handleMenu}>
                                    home
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/about" onClick={handleMenu}>
                                    about
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/shop" onClick={handleMenu}>
                                    shop
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/cart" onClick={handleMenu}>
                                    cart
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/portfolio" onClick={handleMenu}>
                                    portfolio
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/blog" onClick={handleMenu}>
                                    blog
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/contact" onClick={handleMenu}>
                                    contact
                                </Link>
                            </li>
                        </ul>
                    }
                
                    <div className="icons">
                        
                        
                        <div className="shopping-cart" >
                            <i className="fa fa-shopping-bag" onClick={handleShoppingCart}></i>
                            <span className="counter-item" onClick={handleShoppingCart}>{cart.length}</span>
                            <div className="product-list">
                                {toggleCart && 
                                <>
                                    <ul className="shopping-cart-list">
                                        {cart && cart.map(product=>{
                                            totalPrice = totalPrice + product.productPrice;

                                            return (
                                            <li key={product._id}>
                                                <img src={`/uploads/${product.productImg}`} alt={product.productName} />
                                                <div className="desc-item">
                                                    <h4>{product.productName}</h4>
                                                    <span className="price-item">${product.productPrice}</span>
                                                    
                                                </div>
                                                
                                            </li>)
                                        })}
                                    </ul>
                                    {cart && 
                                    <>
                                        
                                        <Link className="link-to-cart" to="/cart" onClick={handleShoppingCart}>
                                            go to cart
                                        </Link>
                                    </>
                                    }
                                    
                                </>}
                                
                            </div>
                            
                        </div>
                        <div className="parameters">
                            <i className="fa fa-cog"></i>
                        </div>
                        <div className="user" onClick={handleUser}>
                            <i className="fa fa-user"></i>
                            {toggleUser?
                                isAuthentication()?
                                <div className="user-item" >
                                    <div>
                                        {isAuthentication().username}
                                    </div>
                                    <button className="logout" onClick={handelLogout}>log out</button>
                                </div>:
                                <div className="user-item" >
                                    <Link to="/signin">sign in</Link>
                                    <Link to="/signup" >sign up</Link>
                                </div>
                            :false}
                        </div>
                        <div className="toggle-menu" onClick={handleMenu}>
                            <i className="fa fa-bars"></i>
                        </div>
                    </div>
                </div>}
                {isAuthentication() && isAuthentication().role === 1 && 
                   
                    <div className="navBarContent nav-admin ">  
                        <div className="logo">
                            <Link className="logoLink" to="/admin/dashboard">logancee</Link>
                        </div>
                        
                        {
                            toggleAdminMenu?
                            <div className="nav-admin-list active ">
                                <ul className="nav-admin-link ">
                                    <li>
                                        <Link className="link" to="/admin/dashboard" >
                                            <i className="fa fa-home" aria-hidden="true"></i>
                                            <span>dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="#" >
                                            <i className="fa fa-users" aria-hidden="true"></i>

                                            <span>customer</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="#" >
                                            <i className="fa fa-envelope" aria-hidden="true"></i>
                                            <span>message</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="#" >
                                            <i className="fa fa-cog" aria-hidden="true"></i>
                                            <span>setting</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="#" >
                                        <i className="fa fa-archive" aria-hidden="true"></i>
                                            <span>store</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="#" >
                                            <i className="fa fa-comments" aria-hidden="true"></i>
                                            <span>comments</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="logout" onClick={handelLogout}>
                                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                                            <span>log out</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>:
                            <div className="nav-admin-list ">
                                <ul className="nav-admin-link ">
                                    <li>
                                        <Link className="link" to="/admin/dashboard" >
                                            <i className="fa fa-home" aria-hidden="true"></i>
                                            <span>dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="#" >
                                            <i className="fa fa-users" aria-hidden="true"></i>

                                            <span>customer</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="#" >
                                            <i className="fa fa-envelope" aria-hidden="true"></i>
                                            <span>message</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="#" >
                                            <i className="fa fa-cog" aria-hidden="true"></i>
                                            <span>setting</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="#" >
                                        <i className="fa fa-archive" aria-hidden="true"></i>
                                            <span>sotre</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="#" >
                                            <i className="fa fa-comments" aria-hidden="true"></i>
                                            <span>comments</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="logout" onClick={handelLogout}>
                                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                                            <span>log out</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>                     
                        }      
                        <div className="search">
                            <label>
                                <input type="text" name="search" placeholder="search here" />
                                <i className='fa fa-search' aria-hidden="true"></i>
                            </label>
                        </div>    
                        <div className="toggle-menu" onClick={handleAdminMenu}>
                            <i className="fa fa-bars"></i>
                        </div>       
                    </div>
                        
                   
                }
            </div>
        </nav>
    )
}

export default withRouter(NavBar)
