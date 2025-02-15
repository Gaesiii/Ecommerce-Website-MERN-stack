import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction.js";
import { useParams } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants.js";

//Cai nay co the coi la view hien thi

const ProductDetails = () => {

    const { id } = useParams();

    const alert = useAlert();

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);

    const { product, loading, erorr } = useSelector(state => state.productDetails);

    // const { isAuthenticated } = useSelector(state => state.user);

    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const [quantity, setQuantity] = useState(1);

    const [open, setOpen] = useState(false);

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState("");

    // const [loginPromptOpen, setLoginPromptOpen] = useState(false);

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {

        // if (!isAuthenticated) {
        //     setLoginPromptOpen(true);
        //     return;
        // }
        dispatch(addItemsToCart(id, quantity, user._id.toString()));
        alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.append("rating", rating);
        myForm.append("comment", comment);
        myForm.append("productId", id);
        dispatch(newReview(myForm));
        setOpen(false);
    };

    useEffect(() => {

        window.scrollTo(0, 0);
        if (erorr) {
            alert.error(erorr);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Suuccessfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, alert, erorr, reviewError, success]);



    const options = {
        // edit: false,
        // color: "rgba(20,20,20,0.1)",
        // activeColor: "tomato",
        // size: window.innerWidth < 600 ? 20 : 25,
        size: "large",
        value: product.ratings,
        // isHalf: true,
        readOnly: true,
        precision: 0.5,
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`${product.name} -- ECOMMERCE`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product && product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            // key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`$ ${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity} >+</button>
                                    </div>
                                    <button disabled={product.Stock < 1 /* || isAuthenticated == false*/ ? true : false} onClick={addToCartHandler} >Add to Cart</button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>
                            <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                        </div>

                    </div>


                    {/* <Dialog
                        open={loginPromptOpen}
                        onClose={() => setLoginPromptOpen(false)}
                    >
                        <DialogTitle>{"You need to log in to add this item to cart"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => setLoginPromptOpen(false)} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog> */}





                    <h3 className="reviewsHeading">REVIEWS</h3>


                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className="submitDialogTexArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            >

                            </textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary" >Cancel</Button>
                            <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                        </DialogActions>
                    </Dialog>




                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
                        </div>
                    ) : (

                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )
            }
        </Fragment >
    );

};

export default ProductDetails