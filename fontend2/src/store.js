import { createStore, combineReducers, applyMiddleware } from "redux";
// import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";


const reducer = combineReducers({

    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});

let initialState = {
    // cart: {
    //     cartItems: localStorage.getItem("cartItems")
    //         ? JSON.parse(localStorage.getItem("cartItems"))
    //         : [],
    //     shippingInfo: localStorage.getItem("shippingInfo")
    //         ? JSON.parse(localStorage.getItem("shippingInfo"))
    //         : [],
    // },

    cart: {
        cartItems: localStorage.getItem("cartItems") && localStorage.getItem("userId")
            ? JSON.parse(localStorage.getItem("cartItems"))[localStorage.getItem("userId")]
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },

};

const middleware = [thunk];

// console.log(middleware);
// console.log(applyMiddleware(...middleware));
// console.log(composeWithDevTools(applyMiddleware(...middleware)));
// console.log(createStore);
// console.log(reducer);
// console.log(initialState);
// console.log(createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))));
const store = createStore(
    reducer,
    initialState,
    // composeWithDevTools(applyMiddleware(...middleware))
    applyMiddleware(...middleware)
);


export default store;