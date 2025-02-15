import React, { Fragment, useState, useEffect } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutLineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Slidebar from "./Slidebar";
import { useNavigate } from "react-router-dom"
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { useParams } from "react-router-dom";
import { getUserDetails, updateUser, clearErrors } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const { id } = useParams();


    useEffect(() => {

        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
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
            alert.success("User Updated Successfully")
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [alert, error, dispatch, navigate, id, isUpdated, updateError, user]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("role", role);

        dispatch(updateUser(id, myForm));

    };


    return (
        <Fragment>
            <MetaData title="Update User" />
            <div className="dashboard">
                <Slidebar />
                <div className="newProductContainer">
                    {loading ? <Loader /> :
                        <form
                            className="createProductForm"
                            encType="multipart/form-data"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>

                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>



                            <div>
                                <MailOutLineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>


                            <div>
                                <VerifiedUserIcon />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>






                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={updateLoading ? true : false || role === "" ? true : false}
                            >
                                Update User
                            </Button>


                        </form>}
                </div>
            </div>

        </Fragment>
    )
}


export default UpdateUser