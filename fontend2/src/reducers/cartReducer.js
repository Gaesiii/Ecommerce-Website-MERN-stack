import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO, LOAD_USER_CART, LOAD_USER_SHIPPING_INFO } from "../constants/cartConstants";
// import { LOGOUT_SUCCESS } from "../constants/userConstants"

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i)
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case LOAD_USER_CART:
            return {
                ...state,
                cartItems: action.payload,
            };

        // case LOGOUT_SUCCESS:
        //     return {
        //         ...state,
        //         cartItems: [],
        //         shippingInfo: {},
        //     };

        case LOAD_USER_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };


        default:
            return state;
    }
};