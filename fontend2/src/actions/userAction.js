import {
    CLEAR_ERRORS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from "../constants/userConstants";
import { LOAD_USER_CART, LOAD_USER_SHIPPING_INFO } from "../constants/cartConstants";
import axios from "axios";

//Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `api/v1/login`,
            { email, password },
            config
        );
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });

        // Load user's cart from localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
        let userCartItems = cartItems[data.user._id] || [];
        dispatch({ type: LOAD_USER_CART, payload: userCartItems });

        //Load user's shipping info from localStorage
        let shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
        let userShippingInfo = shippingInfo[data.user._id] || {};
        dispatch({ type: LOAD_USER_SHIPPING_INFO, payload: userShippingInfo });


    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

//Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        // const config = { headers: { "Content-Type:": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, userData);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });

        console.log("Respone from server register", data);

    } catch (error) {
        console.log("LỖI");
        console.log(userData);
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });

    }
};

//Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`api/v1/me`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
        console.log("Respone from server loadUser", data);
    }
    catch (error) {
        console.log("Lỗi loadUser");
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.response });
    }
};
//LoadUpdatedUser
export const loadUpdatedUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/v1/me`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
        console.log("Response from server loadUpdatedUser", data);
    } catch (error) {
        console.log("Error loading updated user:", error);
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.response });
    }
};


//Logout User
export const logout = () => async (dispatch) => {
    try {

        await axios.get(`/api/v1/logout`);

        dispatch({ type: LOGOUT_SUCCESS });
    }
    catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.response });
    }
};

//Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        // const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/me/update`, userData, config);


        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
        // dispatch(loadUpdatedUser());
        console.log("Respone from server updateProfile", data.user);
    }
    catch (error) {
        const errorMessage = error.response ? error.response.data.message : "Unknown Error";
        // dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message, });
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: errorMessage });
        console.log(errorMessage);
    }
};

//Update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/password/update`,
            passwords,
            config
        );


        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};


//Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });

    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
    }
};


//Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
    }
};



//get All User
export const getAllUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/users`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    }
    catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.response });
    }
};

//get  User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.response });
    }
};

//Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/admin/user/${id}`,
            userData,
            config
        );


        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(
            `/api/v1/admin/user/${id}`
        );


        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};



//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}