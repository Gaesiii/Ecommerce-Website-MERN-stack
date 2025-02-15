import React, { Component, Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import UpdateProfile from "../User/UpdateProfile";

const ProtectedRoute2 = ({ element: Element, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if (loading) return <Loader />;
    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <Fragment>
            <UpdateProfile />;
        </Fragment>


    );
};
export default ProtectedRoute2;
