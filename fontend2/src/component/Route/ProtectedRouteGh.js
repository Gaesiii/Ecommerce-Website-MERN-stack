import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from 'react-router-dom';

const ProtectedRouteGh = ({ isAdmin }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    let location = useLocation();

    return (
        <Fragment>
            {loading === false && (
                isAuthenticated === false || (isAdmin === true && user.role !== "admin")
                    ? <Navigate to="/login" state={{ from: location }} replace />
                    : <Outlet />
            )}
        </Fragment>
    );
};

export default ProtectedRouteGh;