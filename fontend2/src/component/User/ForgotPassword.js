import React, { useState, Fragment, useEffect } from "react";
import "./ForgotPassword.css"
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { loadUser } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { error, message, loading } = useSelector((state) => state.forgotPassword);
    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
            navigate("/login");
        }
    }, [dispatch, error, alert, message]);

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Forgot Password" />
                <div className="forgotPasswordContainer">
                    <div className="forgotPasswordBox">
                        <h2 className="forgotPasswordHeading">Forgot Password</h2>
                        <form
                            className="forgotPasswordForm"
                            onSubmit={forgotPasswordSubmit}
                        >
                            <div className="forgotPasswordEmail">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email || ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>


                            <input
                                type="submit"
                                value="Send"
                                className="forgotPasswordBtn"
                            />
                        </form>
                    </div>
                </div>


            </Fragment>}
        </Fragment>
    )
}

export default ForgotPassword