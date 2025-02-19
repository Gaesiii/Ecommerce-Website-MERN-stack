import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ResetPassword = () => {

    console.log('ResetPassword.js')

    const dispatch = useDispatch();

    const { token } = useParams();

    const navigate = useNavigate();

    const alert = useAlert();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");


    const resetPasswordSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("password", password);
        myForm.append("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    };


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");
            navigate("/login");
        }

    }, [dispatch, error, alert, navigate, success]);
    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Change Password" />
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h2 className="resetPasswordHeading">Change Password</h2>
                        <form
                            className="resetPasswordForm"
                            onSubmit={resetPasswordSubmit}
                        >



                            <div >
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div >
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>


                            <input
                                type="submit"
                                value="Update"
                                className="resetPasswordBtn"
                            />
                        </form>
                    </div>
                </div>


            </Fragment>}
        </Fragment>);
}

export default ResetPassword