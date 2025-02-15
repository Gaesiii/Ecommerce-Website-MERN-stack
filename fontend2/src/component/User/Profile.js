import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {

    const { user, loading, isAuthenticated } = useSelector(state => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={`${user.name}'s Profile`} />
                <div className="profileContainer">
                    <div>
                        <h1>My Profile</h1>
                        <img src={user.avatar.url} alt={user.name} />
                        <Link to="/me/update">Edit Profile</Link>
                    </div>
                    <div>
                        <div>
                            <h4>Full name</h4>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4>Phone No</h4>
                            <p>{user.phoneNumber}</p>
                        </div>
                        <div>
                            <h4>Birth Date</h4>
                            <p>{new Date(user.birthDate).toLocaleDateString("en-US")}  (en-US)</p>
                        </div>
                        <div>
                            <h4>Address</h4>
                            <p>{user.address}</p>
                        </div>
                        <div>
                            <h4>Role</h4>
                            <p>{user.role}</p>
                        </div>
                        <div>
                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substr(0, 10)}</p>
                        </div>
                        <div>
                            <Link to="/orders">My Orders</Link>
                            <Link to="/password/update">Change Password</Link>
                        </div>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default Profile;