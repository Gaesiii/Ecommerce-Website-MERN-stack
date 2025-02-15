import React, { Component, Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import Profile from "../User/Profile";


const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if (loading) return <Loader />;
    if (!isAuthenticated) return <Navigate to="/login" />;


    // if (loading) {
    //     return null; // Hoặc có thể hiển thị một loader
    // }

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" />;
    // }

    return (
        <Fragment>
            <Profile />;
        </Fragment>

        // <Fragment>
        //     {!loading && (
        //         <Route
        //             {...rest}
        //             render={(props) => {
        //                 if (!isAuthenticated) {
        //                     return <Navigate to="/login" />;
        //                 }
        //                 return <Component {...props} />;
        //             }}
        //         />
        //     )}
        // </Fragment>



        // <Fragment>
        //     {!loading && (
        //         <Routes>
        //             <Route
        //                 {...rest}
        //                 render={(props) => {
        //                     if (!isAuthenticated) {
        //                         return <Navigate to="/login" />;
        //                     }
        //                     return <Element {...props} />;
        //                 }}
        //             />
        //         </Routes>
        //     )}
        // </Fragment>







        // <Route>
        //     {!loading && (
        //         <Route
        //             {...rest}
        //             render={(props) => {
        //                 if (!isAuthenticated) {
        //                     return <Navigate to="/login" />;
        //                 }
        //                 return <Component {...props} />;
        //             }}
        //         />
        //     )}
        // </Route>





        // <Route
        //     {...rest}
        //     render={(props) => {
        //         if (!loading) {
        //             if (!isAuthenticated) {
        //                 // Redirect to login page if not authenticated
        //                 return <Navigate to="/login" />;
        //             }
        //             // Render the component if authenticated
        //             return <Component {...props} />;
        //         }
        //         // Optionally, you can render a loader component while loading
        //         return <Loader />;
        //     }}
        // />



        //    GTP chỉ phía dưới//
        // <Route
        //     {...rest}
        //     render={(props) => {
        //         if (!loading) {
        //             if (!isAuthenticated) {
        //                 return <Navigate to="/login" />;
        //             }
        //             return <Component {...props} />
        //         }
        //         return <Loader />
        //     }}
        // />


        // <Route
        //     {...rest}
        //     element={
        //         isAuthenticated ? (
        //             <Profile />
        //         ) : !loading ? (
        //             <Navigate to="/login" />
        //         ) : (
        //             <Loader />
        //         )
        //     }
        // />







        // <Fragment>
        //     {!loading && (
        //         <Routes>
        //             <Route
        //                 {...rest}
        //                 render={(props) => {
        //                     if (!isAuthenticated) {
        //                         return <Navigate to="/login" />;
        //                     }
        //                     return <Component {...props} />;
        //                 }}
        //             />
        //         </Routes>

        //     )}
        // </Fragment>


        // <Routes>
        //     <Route
        //         {...rest}
        //         element={
        //             !loading ? (
        //                 isAuthenticated ? (
        //                     <Component />
        //                 ) : (
        //                     <Navigate to="/login" />
        //                 )
        //             ) : (
        //                 <Loader />
        //             )
        //         }
        //     />
        // </Routes>

        // <Route {...rest} element={<Element />} />








    );
};
export default ProtectedRoute
