import React, { Fragment, useEffect } from "react";
import { CiDesktopMouse2 } from "react-icons/ci";
// import Product from "./ProductCard";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProductRandom } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";



// this is static data sample
// const product = {
//     name: "Blue Tshirt",
//     images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//     price: "$300",
//     _id: "abhishek",
// };


const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductRandom());
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            {loading ? (<Loader />) : (<Fragment>
                <MetaData title="ECOMMERCE" />

                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

                    <a href="#container">
                        <button>
                            Scroll <CiDesktopMouse2></CiDesktopMouse2>
                        </button>
                    </a>
                </div>

                <h2 className="homeHeading">Featured Products</h2>

                <div className="container" id="container">

                    {products && products.map((product) => (<ProductCard key={product._id} product={product} />))}

                </div>
            </Fragment>)}
        </Fragment>
    );
};

export default Home