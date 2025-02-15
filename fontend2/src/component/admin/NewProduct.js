import React, { Fragment, useState, useEffect } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, clearErrors } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Slidebar from "./Slidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom"

const NewProduct = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
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

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Product Created Successfully")
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [alert, error, dispatch, navigate, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        if (!name || !price || !description || !category || !Stock || !images.length === 0) {
            alert.error("please fill in all fields");
            return;
        }


        const myForm = new FormData();

        myForm.append("name", name);
        myForm.append("price", price);
        myForm.append("description", description);
        myForm.append("category", category);
        myForm.append("Stock", Stock);

        //Kiểm tra xem có hình ảnh nào được chọn không



        // images.forEach((image, index) => {
        //     myForm.append(`images[${index}]`, image.file)
        // });

        // Thay image.file thành image


        // images.forEach((image, index) => {
        //     myForm.append(`images[${index}]`, image);
        // });

        // images.forEach((image, index) => {
        //     myForm.append(`avatar[${index}]`, image);
        // });

        if (images && images.length > 0) {
            images.forEach((image) => {
                myForm.append(`images`, image);
                // console.log("cc", image);
            });
        } else {
            alert.error("Please select at least 1 image");
            return;
        }



        if (images.length === 0) {
            alert.error("Please select at least 1 image")
            return;
        }



        dispatch(createProduct(myForm));
        console.log("Name:", name);
        console.log("Price:", price);
        console.log("Description", description);
        console.log("Category:", category);
        console.log("Stock:", Stock);
        console.log("Images:", images);
        console.log("Form Data:", myForm);
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);


        //Kiểm tra nếu không có file nào được chọn
        if (files.length === 0) {
            return;
        }


        setImages([...images]);
        setImagesPreview([...imagesPreview]);

        //Tạo mảng mới để lưu trữ tất cả các hình ảnh mới và cũ
        // const newImages = [...images];
        // const newImagesPreview = [...imagesPreview];


        files.forEach((file) => {
            const reader = new FileReader();


            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);


                    // newImages.push({
                    //     name: file.name,
                    //     type: file.type,
                    //     size: file.size,
                    //     url: reader.result,
                    // });



                    // newImages.push(file);
                    // newImagesPreview.push(reader.result);
                    // setImages([...newImages]);
                    // setImagesPreview([...newImagesPreview]);

                }
            };

            reader.readAsDataURL(file);
        });
        // Cập nhật mảng hình ảnh với tất cả các hình ảnh mới và cũ
        // setImagesPreview([...imagesPreview, ...newImagesPreview]);
        // setImages([...images, ...newImages]);
    };

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <Slidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>
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
                            <select onChange={(e) => setCategory(e.target.value)}>
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
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                // name="images"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt={`Product Image ${index}`} className="preview-image" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>


                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default NewProduct;