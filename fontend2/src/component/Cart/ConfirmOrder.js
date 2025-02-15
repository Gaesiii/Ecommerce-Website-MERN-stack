import React, { Fragment, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;
    const [paymentMethod, setPaymentMethod] = useState("VISA");
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;
    const proceedToPayment = () => {
        /* data*/ let data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        if (paymentMethod === "MOMO") {
            const exchangeRate = 25000;
            data = {
                ...data,
                subtotal: data.subtotal * exchangeRate,
                shippingCharges: data.shippingCharges * exchangeRate,
                tax: data.tax * exchangeRate,
                totalPrice: data.totalPrice * exchangeRate,
            };
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        if (paymentMethod === "VISA") {
            navigate("/process/payment");
        } else {
            navigate("/process/paymentMomo");
        }
        // sessionStorage.setItem("orderInfo", JSON.stringify(data));
        // navigate("/process/payment");
    };


    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X ${item.price} ={" "}
                                            <b>${item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {/*  */}
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summery</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>$ {subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>$ {shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>$ {tax}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>$ {totalPrice}</span>
                        </div>


                        <form className="formCheckout">
                            <div>
                                <input
                                    type="radio"
                                    id="visa"
                                    name="paymentMethod"
                                    value="VISA"
                                    checked={paymentMethod === "VISA"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label for="visa">VISA</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="momo"
                                    name="paymentMethod"
                                    value="MOMO"
                                    checked={paymentMethod === "MOMO"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label for="momo">MOMO</label>
                            </div>


                        </form>


                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default ConfirmOrder;