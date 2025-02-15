import React, { Component, Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import OrderDetails from "../Order/OrderDetails";

const ProtectedRoute8 = ({ element: Element, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if (loading) return <Loader />;
    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <Fragment>
            <OrderDetails />;
        </Fragment>


    );
};
export default ProtectedRoute8;
