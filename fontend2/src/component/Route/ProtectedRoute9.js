import React, { Component, Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import Dashboard from "../admin/Dashboard.js";

const ProtectedRoute9 = ({ element: Element, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if (loading) return <Loader />;
    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <Fragment>
            <Dashboard />;
        </Fragment>


    );
};
export default ProtectedRoute9;
