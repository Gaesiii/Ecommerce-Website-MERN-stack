import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { createPaymentRequest } from './momoPayment';

const PaymentMomo = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const payBtn = useRef(null);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    };

    // useEffect(() => {
    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors());
    //     }

    //     createPaymentRequest(order);
    // }, [dispatch, alert, error, order]);

    return (
        <div>
            <button ref={payBtn} className="btn btn-primary btn-block">
                Pay now
            </button>
        </div>
    );
};

export default PaymentMomo;