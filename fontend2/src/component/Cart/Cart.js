import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction.js";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData.js";
import Loader from "../layout/Loader/Loader.js";


const Cart = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.user);

    const { isAuthenticated } = useSelector(state => state.user)

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty, user._id.toString()));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty, user._id.toString()));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id, user._id.toString()));
    };

    const checkoutHandler = () => {
        if (isAuthenticated) {
            navigate("/shipping")
        } else {
            navigate("/login?redirect=shipping");
        }

    }


    //cai ben duoi la static data
    // const item = {
    //     product: "productID",
    //     price: "200",
    //     name: "abhi",
    //     quantity: 1,
    //     image: "https://images.samsung.com/is/image/samsung/vn-full-hd-t6500-ua43t6500akxxv-frontblack-217615053?$650_519_PNG$",

    // }

    // if (!user) {
    //     return <Loader />; // Or your preferred loading state
    // }

    return (
        <div>
            {isAuthenticated ? (<Fragment>
                <MetaData title={`${user.name} 's Cart`} />
                {cartItems.length === 0 ? (<div className="emptyCart">

                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>

                </div>) : (<Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>



                        {cartItems && cartItems.map((item) => (
                            <div className="cartContainer" key={item.product} >
                                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                                <p className="cartSubtotal">{`$${item.price * item.quantity}`}</p>
                            </div>
                        ))}


                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`$${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price,
                                    0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>

                        </div>
                    </div>
                </Fragment>)}
            </Fragment>) : (
                <Fragment>
                    <MetaData title={`Guest 's Cart`} />
                    {cartItems.length === 0 ? (<div className="emptyCart">

                        <RemoveShoppingCartIcon />
                        <Typography>No Product in Your Cart</Typography>
                        <Link to="/products">View Products</Link>

                    </div>) : (<Fragment>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>



                            {cartItems && cartItems.map((item) => (
                                <div className="cartContainer" key={item.product} >
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    <div className="cartInput">
                                        <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                    </div>
                                    <p className="cartSubtotal">{`$${item.price * item.quantity}`}</p>
                                </div>
                            ))}


                            <div className="cartGrossProfit">
                                <div></div>
                                <div className="cartGrossProfitBox">
                                    <p>Gross Total</p>
                                    <p>{`$${cartItems.reduce(
                                        (acc, item) => acc + item.quantity * item.price,
                                        0
                                    )}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button onClick={checkoutHandler}>Check Out</button>
                                </div>

                            </div>
                        </div>
                    </Fragment>)}
                </Fragment>
            )}
        </div>
    );
};

export default Cart