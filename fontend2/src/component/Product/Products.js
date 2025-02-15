import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom"; /*GTP chỉ */
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhone",
    "Car",
    "Food",
    "Toys",
    "Beverage",
    "Furniture"
];




const Products = (/*{ match }*/) => {

    // const navigate = useNavigate(); //tự thêm

    const alert = useAlert();

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const [price, setPrice] = useState([0, 25000]);

    const [category, setCategory] = useState("");

    const [ratings, setRatings] = useState(0)

    const { products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector(state => state.products);


    const { isAuthenticated } = useSelector(state => state.user);//tự thêm

    // const keyword = match.params.keyword; /*gốc */

    // const { keyword } = match.params;

    const { keyword } = useParams(); /*GTP chỉ */

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
        dispatch(getProduct(keyword, pageNumber, price, category, ratings));
    }

    // const setCurrentPageNo = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // }

    // const handleCategoryChange = (selectedCategory) => {
    //     setCategory(selectedCategory);
    // };
    // const handleRatingsChange = (event, newRating) => {
    //     setRatings(newRating);
    // };





    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);

    };


    useEffect(() => {

        // if (isAuthenticated === false) {
        //     navigate("/login");
        // } //tự thêm
        console.log("Products array:", products);
        console.log("currentPageNumber:", currentPage);
        console.log("resultPerPage:", resultPerPage);
        console.log("FilteredProductsCount:", filteredProductsCount);
        console.log("Total products:", productsCount);

        window.scrollTo(0, 0);
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error/*, isAuthenticated, /*navigate*/]);

    let count = filteredProductsCount;

    return (<Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title="PRODUCT -- ECOMMERCE" />
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>


                {/* {keyword && <div className="filterBox"> */}

                {/*{*/}  <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    >

                    </Slider>


                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li className="category-link"
                                key={category}
                                onClick={() => setCategory(category)}
                            // onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>

                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider value={ratings}
                            onChange={(e, newRating) => {
                                setRatings(newRating);
                            }}
                            // onChange={handleRatingsChange}
                            aria-labelledby="continuous-slider"
                            min={0}
                            max={5}
                            valueLabelDisplay="auto"

                        />
                    </fieldset>

                </div>  {/*}*/}


                {resultPerPage < count && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Pre"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"

                        />
                    </div>
                )}
            </Fragment>
        )}
    </Fragment>
    );
};

export default Products