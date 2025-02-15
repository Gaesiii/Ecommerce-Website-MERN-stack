import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import axios from "axios";

//Add to cart
export const addItemsToCart = (id, quantity, userId) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        },
    });
    // console.log("userId", userId);
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    // console.log("cartItems1", cartItems);
    cartItems[userId.toString()] = getState().cart.cartItems;
    // console.log("cartItems2", cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // console.log("cartItems3", cartItems);

    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//REMOVE FROM CART
export const removeItemsFromCart = (id, userId) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    cartItems[userId] = getState().cart.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));


    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//SAVE SHIPPING INFO
export const saveShippingInfo = (data, userId) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    let shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
    shippingInfo[userId.toString()] = data;
    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));


    // localStorage.setItem("shippingInfo", JSON.stringify(data));
};