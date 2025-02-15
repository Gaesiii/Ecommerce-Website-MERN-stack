import "./OrderSuccess.css";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

const OrderSuccess = () => {
    return (
        <Fragment>
            <div className="orderSuccess">
                <CheckCircleIcon />

                <Typography>Your Order has been Placed successfully</Typography>
                <Link to="/orders" >View Order</Link>
            </div>
        </Fragment>
    );
};

export default OrderSuccess