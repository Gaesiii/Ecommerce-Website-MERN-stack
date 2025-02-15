import React from "react";
import "./Slidebar.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo2.png";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ImportExport from "@material-ui/icons/ImportExport";


const Slidebar = () => {
    return (
        <div className="slidebar">
            <Link to="/">
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon />Dashboard
                </p>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExport />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="ALL" icon={<PostAddIcon />}></TreeItem>
                        </Link>
                        <Link to="/admin/product" >
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />}></TreeItem>
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>

            <Link to="/admin/orders" >
                <p>
                    <ListAltIcon />
                    Orders
                </p>
            </Link>

            <Link to="/admin/users">
                <p>
                    <PeopleIcon />Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <RateReviewIcon />
                    Reviews
                </p>
            </Link>

        </div>
    )
}

export default Slidebar