import React, { useEffect } from "react";
import Slidebar from "./Slidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { /*Doughnut,*/ Line } from "react-chartjs-2"
import { Chart } from "chart.js";
import { LinearScale, CategoryScale, ArcElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import DoughnutChart from "./DoughnutChart .js";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";

Chart.register(CategoryScale, ArcElement, PointElement, LineElement, LinearScale, Tooltip, Legend);

const Dashboard = () => {

    // useEffect(() => {
    //     Chart.register(LinearScale, CategoryScale, ArcElement, LineElement)
    // }, []);  

    // Chart.register(CategoryScale);
    // Chart.register(ArcElement);
    // Chart.register(LinearScale);
    // Chart.register(PointElement);
    // Chart.register(LineElement);

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();


    let outOfStock = 0;

    products && products.forEach((item) => {
        if (item.Stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    let totalAmount = 0;
    orders && orders.forEach((item) => {
        totalAmount += item.totalPrice;
    });


    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                data: [outOfStock, (products.length) - (outOfStock)],
                backgroundColor: ["#00A6B4", "#680004"],
                hoverBackgroundColor: ["#485000", "#35014F"],

            },
        ]
    }

    return (
        <div className="dashboard">
            <Slidebar />
            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br />  $ {parseFloat(totalAmount).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>

                        {/* {totalAmount.toFixed(2).toLocaleString('de-DE')} */}
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to={"/admin/products"}>
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to={"/admin/orders"}>
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to={"/admin/users"}>
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line
                        data={lineState} />
                </div>

                <div className="doughnutChart">
                    {/* <Doughnut
                        data={doughnutState}
                    options={{
                        labels: ["Out of Stock", "InStock"],
                    }}
                    options={{
                        plugins: {
                            legend: {
                                display: true,
                                position: 'right',
                            }
                        }
                    }}
                    /> */}
                    <DoughnutChart chartData={doughnutState} />

                </div>

            </div>
        </div>
    );
};

export default Dashboard