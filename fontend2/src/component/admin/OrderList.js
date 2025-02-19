import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Slidebar from "./Slidebar";
import { DataGrid } from "@material-ui/data-grid"
import { useNavigate } from "react-router-dom";
import { deleteOrder, getAllOrders, clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader/Loader";

const OrderList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Order Deleted Successfully");
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());

    }, [error, alert, dispatch, deleteError, navigate, isDeleted]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (pararms) => {
                return pararms.getValue(pararms.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {

                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>

                    </Fragment>
                );
            },
        },
    ];



    const rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - ADMIN`} />

            <div className="dashboard">
                <Slidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading" >ALL ORDERS</h1>

                    {orders ? (<DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={12}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                        style={{ width: '100%' }}
                    />
                    ) : (<Loader />)}

                </div>
            </div>


        </Fragment>
    )
}

export default OrderList