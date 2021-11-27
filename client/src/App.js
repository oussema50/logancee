import React,{useState,useEffect} from 'react';
import Header from './components/Header';
import About from './components/about/About';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Home from './components/home/Home';
import SignUp from './components/user/SignUp';
import SignIn from './components/user/SignIn';
import AdminDashboard from './components/AdminDashboard ';
import UserDashboard from './components/UserDashboard';
import AdminRoute from './components/AdminRoute';
import AdminEditProduct from './components/AdminEditProduct';
import UserRoute from './components/UserRoute';
import NotFound from './components/NotFound';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
// import { isAuthentication } from './components/helpers/auth';
import './App.css';
import Product from './components/Product';

function App() {
  const [toggleAdminMenu,setToggleAdminMenu] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header toggleAdminMenu={toggleAdminMenu} setToggleAdminMenu={setToggleAdminMenu} />
        <main style={{display:"flex",flexDirection:"column",justifyContent:"center",paddingTop:"80px"}}>
          
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/shop" exact component={Shop} />
            <Route path="/product/:productId" exact component={Product} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} toggleAdminMenu={toggleAdminMenu} setToggleAdminMenu={setToggleAdminMenu} />
            <AdminRoute path="/admin/edit/product/:productId" exact component={AdminEditProduct} toggleAdminMenu={toggleAdminMenu} setToggleAdminMenu={setToggleAdminMenu} />
            <UserRoute path="/" exact component={Home} />
            <UserRoute path="/Cart" exact component={Cart} />
            <Route component={NotFound} />
          </Switch>
          
        </main>
      </div>
    </Router>
  );
}

export default App;
