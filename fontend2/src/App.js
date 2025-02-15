// import logo from './logo.svg';
import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect, useState } from 'react';
import Footer from "./component/layout/footer/Footer.js";
import Home from "./component/Home/Home.js";
// import Loader from './component/layout/Loader/Loader.js';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store.js";
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from 'react-redux';
// import Profile from "./component/User/Profile.js";
// import ProtectedRoute from './component/Route/ProtectedRoute.js';
// import ProtectedRoute2 from './component/Route/ProtectedRoute2.js';
// import ProtectedRoute3 from './component/Route/ProtectedRoute3.js';
// import ProtectedRoute4 from './component/Route/ProtectedRoute4.js';
// import ProtectedRoute5 from './component/Route/ProtectedRoute5.js';
// import ProtectedRoute6 from './component/Route/ProtectedRoute6.js';
// import ProtectedRoute7 from './component/Route/ProtectedRoute7.js';
// import ProtectedRoute8 from './component/Route/ProtectedRoute8.js';
// import ProtectedRoute9 from './component/Route/ProtectedRoute9.js';
import ProtectedRouteMain from './component/Route/ProtectedRouteMain.js'
// import ProtectedRouteGh from './component/Route/ProtectedRouteGh.js';
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from 'axios';
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import Dashboard from './component/admin/Dashboard.js';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';
import ProductList from "./component/admin/ProductList.js";
import NewProduct from './component/admin/NewProduct.js';
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from './component/admin/OrderList.js';
import ProcessOrder from './component/admin/ProcessOrder.js';
import UsersList from './component/admin/UserList.js';
import UpdateUser from './component/admin/UpdateUser.js';
import ProductReviews from './component/admin/ProductReviews.js';
import About from './component/layout/About/About.js';
import Contact from './component/layout/Contact/Contact.js';
import NotFound from "./component/layout/Not Found/NotFound.js";
import PaymentMomo from './component/Cart/PaymentMomo.js';


function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  // }

  const getStripeApiKey = async () => {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
      console.log("Fectching Stripe API key Successfully");
    } catch (error) {
      console.log("Error fectching Stripe API key", error);
    }
  };



  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    // getStripeApiKey();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getStripeApiKey();
    }
  }, [isAuthenticated]);



  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}



      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            {/* <Route path="/process/payment" Component={Payment} /> */}
            {/* <Route path="/process/payment" element={<Payment />} /> */}
            <Route path='/process/payment' element={<ProtectedRouteMain isAdmin={false} ><Payment /></ProtectedRouteMain>} />
          </Routes>
        </Elements>
      )}



      <Routes>

        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path='/' Component={Home} />
        <Route exact path='/about' Component={About} />
        <Route exact path='/contact' Component={Contact} />



        {/* <Route exact path="/sad" element={Loader} /> */}
        {/* <Route exact path="/product/:id" element={<ProductDetails />} /> */}
        <Route exact path="/product/:id" Component={ProductDetails} />
        {/* <Route exact path="/product/:id" Component={ProductDetails} /> */}



        {/* <Route exact path="/products" element={<Products />} /> */}
        <Route exact path="/products" Component={Products} />



        {/* <Route path="/products/:keyword" element={<Products />} /> */}
        <Route path="/products/:keyword" Component={Products} />



        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/search" Component={Search} />




        {/* <Route element={<ProtectedRoute exact path="/account" element={<Profile />} />} /> */}
        {/* <Route><ProtectedRoute exact path="/account" element={<Profile />} /></Route> */}
        {/* <Route element={<ProtectedRoute exact path="/account" element={<Products />} />} /> */}

        {/* <ProtectedRoute path="/account" element={<Profile />} /> */}

        {/* <Route path="/account" element={<ProtectedRoute element={<Profile />} />} /> */}

        {/* <Route path="/account" element={<Profile />} /> */}
        {/*
        <Route>
          <ProtectedRoute exact path="/account" element={<Profile />} />
        </Route> */}

        {/* <Route path="/account" element={<ProtectedRoute />} />  quan trọng */}
        {/* <Route path='/account' element={<ProtectedRouteMain component={Profile} />} /> */}
        <Route path='/account' element={<ProtectedRouteMain><Profile /></ProtectedRouteMain>} />



        {/* <Route path='/account' element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
        {/* <ProtectedRoute exact path="/account" component={Profile} /> */}
        {/* <ProtectedRoute path='/account' element={<Profile />} /> */}
        {/* <Route path='/account' element={<ProtectedRoute element={<Profile />} />} /> */}
        {/* <Route path='/account' component={<ProtectedRoute component={<Profile />} />} /> */}

        {/* <Route path='/account' element={<ProtectedRoute />}>
          <Route path='/account' element={<Profile />} />
        </Route> */}



        {/* <ProtectedRoute exact path="/account" component={Profile} /> */}
        {/* <Route exact path="/account" component={Profile} /> */}

        {/* <Route path="/me" element={<Profile />} /> */}


        {/* <Route path="/me/update" element={<UpdateProfile />} /> */}
        {/* <Route path="/me/update" Component={UpdateProfile} /> */}
        {/* <Route path="/me/update" element={<ProtectedRoute2 />} /> */}
        {/* <Route path='/me/update' element={<ProtectedRouteMain component={UpdateProfile} />} /> */}
        <Route path='/me/update' element={<ProtectedRouteMain><UpdateProfile /></ProtectedRouteMain>} />


        {/* <Route path="/password/update" Component={UpdatePassword} /> */}
        {/* <Route path='/password/update' element={<ProtectedRoute3 />} /> */}
        {/* <Route path='/password/update' element={<ProtectedRouteMain component={UpdatePassword} />} /> */}
        <Route path='/password/update' element={<ProtectedRouteMain><UpdatePassword /></ProtectedRouteMain>} />


        <Route path="/password/forgot" Component={ForgotPassword} />
        <Route path="/password/reset/:token" Component={ResetPassword} />
        <Route path="/cart" Component={Cart} />


        {/* <Route path="/shipping" Component={Shipping} /> */}
        {/* <Route path='/shipping' element={<ProtectedRoute4 />} /> */}
        {/* <Route path='/shipping' element={<ProtectedRouteMain component={Shipping} />} /> */}
        <Route path='/shipping' element={<ProtectedRouteMain><Shipping /></ProtectedRouteMain>} />


        {/* <Route path="/order/confirm" Component={ConfirmOrder} /> */}
        {/* <Route path='/order/confirm' element={<ProtectedRoute5 />} /> */}
        {/* <Route path='/order/confirm' element={<ProtectedRouteMain component={ConfirmOrder} />} /> */}
        <Route path='/order/confirm' element={<ProtectedRouteMain><ConfirmOrder /></ProtectedRouteMain>} />


        {/* <Route path='/process/paymentMomo' element={<ProtectedRouteMain component={PaymentMomo} />} /> */}


        {/* <Route path='/success' element={<ProtectedRoute6 />} /> */}
        {/* <Route path='/success' element={<ProtectedRouteMain component={OrderSuccess} />} /> */}
        <Route path='/success' element={<ProtectedRouteMain><OrderSuccess /></ProtectedRouteMain>} />


        {/* <Route path='orders' element={<ProtectedRoute7 />} /> */}
        {/* <Route path='/orders' element={<ProtectedRouteMain component={MyOrders} />} /> */}
        <Route path='/orders' element={<ProtectedRouteMain><MyOrders /></ProtectedRouteMain>} />


        {/* <Route path='/order/:id' element={<ProtectedRoute8 />} /> */}
        {/* <Route path='/order/:id' element={<ProtectedRouteMain component={OrderDetails} />} /> */}
        <Route path='/order/:id' element={<ProtectedRouteMain><OrderDetails /></ProtectedRouteMain>} />


        {/* <Route path='/admin/dashboard' element={<ProtectedRoute9 />} /> */}




        {/* <Route path='/admin/dashboard' element={<ProtectedRouteMain isAdmin={true} component={Dashboard} />} /> */}
        <Route path='/admin/dashboard' element={<ProtectedRouteMain isAdmin={true}><Dashboard /></ProtectedRouteMain>} />
        {/* <Route path="/admin/dashboard" element={<ProtectedRouteGh isAdmin={true} />}>
          <Route path="" element={<Dashboard />} />
        </Route> */}

        {/* <Route path='/admin/products' element={<ProtectedRouteMain isAdmin={true} component={ProductList} />} /> */}
        <Route path='/admin/products' element={<ProtectedRouteMain isAdmin={true}><ProductList /></ProtectedRouteMain>} />


        {/* <Route path='/admin/product' element={<ProtectedRouteMain isAdmin={true} component={NewProduct} />} /> */}
        <Route path='/admin/product' element={<ProtectedRouteMain isAdmin={true}><NewProduct /></ProtectedRouteMain>} />


        {/* <Route path='/admin/product/:id' element={<ProtectedRouteMain isAdmin={true} component={UpdateProduct} />} /> */}
        <Route path='/admin/product/:id' element={<ProtectedRouteMain isAdmin={true}><UpdateProduct /></ProtectedRouteMain>} />

        {/* <Route path='/admin/orders' element={<ProtectedRouteMain isAdmin={true} component={OrderList} />} /> */}
        <Route path='/admin/orders' element={<ProtectedRouteMain isAdmin={true}><OrderList /></ProtectedRouteMain>} />


        {/* <Route path='/admin/order/:id' element={<ProtectedRouteMain isAdmin={true} component={ProcessOrder} />} /> */}
        <Route path='/admin/order/:id' element={<ProtectedRouteMain isAdmin={true}><ProcessOrder /></ProtectedRouteMain>} />


        {/* <Route path='/admin/users' element={<ProtectedRouteMain isAdmin={true} component={UsersList} />} /> */}
        <Route path='/admin/users' element={<ProtectedRouteMain isAdmin={true}><UsersList /></ProtectedRouteMain>} />


        {/* <Route path='/admin/user/:id' element={<ProtectedRouteMain isAdmin={true} component={UpdateUser} />} /> */}
        <Route path='/admin/user/:id' element={<ProtectedRouteMain isAdmin={true}><UpdateUser /></ProtectedRouteMain>} />


        {/* <Route path='/admin/reviews' element={<ProtectedRouteMain isAdmin={true} component={ProductReviews} />} /> */}
        <Route path='/admin/reviews' element={<ProtectedRouteMain isAdmin={true}><ProductReviews /></ProtectedRouteMain>} />

        <Route Component={window.location.pathname === "/process/payment" ? null : NotFound} />




        {/* <Route path="/products" element={<ProtectedRoute />} /> */}   {/*tự thêm*/}

        {/* <Route exact path="/login" element={<LoginSignUp />} />; */}




        <Route exact path='/login' Component={LoginSignUp} />
        {/* <Route path='*' element={<NotFound />} /> */}


        {/* <Route exact path='/' /> */}


      </Routes>





      <Footer />
    </Router>
  )
}

export default App;
