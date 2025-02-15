// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRouteMain = ({ isAdmin, component: Component, ...rest }) => {
//     const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//     const location = useLocation();

//     if (loading === false) {
//         if (isAuthenticated === false) {
//             return <Navigate to="/login" replace state={{ from: location }} />;
//         }

//         if (isAdmin === true && user.role !== "admin") {
//             return <Navigate to="/login" replace state={{ from: location }} />;
//         }

//         return <Component {...rest} />;
//     }

//     return null;
// };

// export default ProtectedRouteMain;


import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteMain = ({ isAdmin, children }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    const location = useLocation();

    if (loading === false) {
        if (isAuthenticated === false) {
            return <Navigate to="/login" replace state={{ from: location }} />;
        }

        if (isAdmin === true && user.role !== "admin") {
            return <Navigate to="/login" replace state={{ from: location }} />;
        }

        return children;
    }

    return null;
};

export default ProtectedRouteMain;


