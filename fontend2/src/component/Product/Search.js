import React, { Fragment, useState } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";     /*StackOverFlow chỉ*/
import "./Search.css";
import MetaData from "../layout/MetaData";
const Search = () => {

    const [keyword, setKeyword] = useState("");

    // const history = useHistory();

    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`); /*StackOverFlow chỉ*/
        } else {
            navigate("/products");         /*StackOverFlow chỉ*/
        }
    };

    return (<Fragment>
        <MetaData title="Search A Product -- ECOMMERCE" />
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
                type="text"
                placeholder="Search a Product ..."
                onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
        </form>
    </Fragment>
    );

};

export default Search;