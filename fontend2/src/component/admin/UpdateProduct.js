import React, { Fragment, useState, useEffect } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct, clearErrors, getProductDetails } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Slidebar from "./Slidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";

const UpdateProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, product } = useSelector((state) => state.productDetails);
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
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

    const productId = id;

    useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setOldImages(product.images);
        }


        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Product Updated Successfully")
            navigate("/admin/dashboard");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [alert, error, dispatch, navigate, isUpdated, productId, product]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("name", name);
        myForm.append("price", price);
        myForm.append("description", description);
        myForm.append("category", category);
        myForm.append("Stock", Stock);

        // if (images && images.length > 0) {
        //     images.forEach((image) => {
        //         myForm.append(`images`, image);
        //     });
        // } else {
        //     alert.error("Please select at least 1 image");
        //     return;
        // }

        images.forEach((image) => {
            myForm.append("images", image);
        });


        dispatch(updateProduct(productId, myForm));

    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);


        setImages([...images]);
        setImagesPreview([...imagesPreview]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();


            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Update Product" />
            <div className="dashboard">
                <Slidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={Stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                // name="images"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>


                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Prewview" className="preview-image" />
                                ))}
                        </div>


                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" className="preview-image" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>


                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateProduct;