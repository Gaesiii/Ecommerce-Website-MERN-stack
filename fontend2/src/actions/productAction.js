import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_REQUEST,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    ALL_REVIEWS_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,

} from "../constants/productConstants";


//get all product
export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }


        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};
//get all product random
export const getProductRandom = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0, random = false) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&random=${random}`;

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&random=${random}`;
        }


        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Get all product-- admin
export const getAdminProduct = () => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/products`);
        dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
    }
    catch (error) {
        dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.response.message });
    }
};
//Creat a product --admin
export const createProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        console.log("hello1");

        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);
        console.log("hello2");
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Delete Product--admin
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
        console.log("hello2");
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Update Product--admin
export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };

        console.log("update 1");
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);
        console.log("update 2")
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
        // window.scrollTo(0, 0);
        // Prevent automatic scroll restoration
        // if ('scrollRestoration' in window.history) {
        //     window.history.scrollRestoration = 'manual';
        // }

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


//NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        }
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};


//Get ALL REVIEW of a product
export const getAllReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: ALL_REVIEWS_REQUEST });
        console.log("hello 1");
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
        console.log("hello 2");
        dispatch({
            type: ALL_REVIEWS_SUCCESS,
            payload: data.reviews,
        });

    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
};


//DELETE REVIEW of a product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};




//Clearing Errors
export const clearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS });
};