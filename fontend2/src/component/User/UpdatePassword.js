import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";


const UpdatePassword = () => {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleOldPasswordVisibility = (event) => {
        event.preventDefault();
        setShowOldPassword(!showOldPassword);
    };

    const toggleNewPasswordVisibility = (event) => {
        event.preventDefault();
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = (event) => {
        event.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    };

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    // const { isAuthenticated } = useSelector(state => state.user);

    const [oldPassword, setOldPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    // function mouseoverPass() {
    //     let obj = document.getElementById('pass1');
    //     obj.type = 'text';
    // }
    // function mouseoutPass() {
    //     let obj = document.getElementById('pass1');
    //     obj.type = 'password';
    // }


    const updatePasswordSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("oldPassword", oldPassword);
        myForm.append("newPassword", newPassword);
        myForm.append("confirmPassword", confirmPassword);
        await dispatch(updatePassword(myForm));
    };


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        // if (isAuthenticated == false) {
        //     navigate("/login");
        // }
        if (isUpdated) {
            alert.success("Password Updated Successfully");
            navigate("/account")
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }

    }, [dispatch, error, alert, navigate, isUpdated/*, isAuthenticated*/]);
    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Change Password" />
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h2 className="updatePasswordHeading">Change Password</h2>
                        <form
                            className="updatePasswordForm"
                            encType="multipart/form-data"
                            onSubmit={updatePasswordSubmit}
                        >

                            <div /*  className="password-input-container"*/ className="LoginPassword">
                                <VpnKeyIcon />
                                <input
                                    // type="password"
                                    type={showOldPassword ? "text" : "password"}
                                    placeholder="Old Password"
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    id="pass1"
                                />

                                <button type="button" onClick={toggleOldPasswordVisibility} className="togglePassword">
                                    {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </button>

                                {/* <img src="https://static.thenounproject.com/png/777494-200.png" onMouseOver={mouseoverPass} onMouseOut={mouseoutPass} alt="123" className="icon" /> */}
                            </div>

                            <div className="LoginPassword">
                                <LockOpenIcon />
                                <input
                                    // type="password"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button type="button" onClick={toggleNewPasswordVisibility} className="togglePassword">
                                    {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </button>
                            </div>

                            <div className="LoginPassword">
                                <LockIcon />
                                <input
                                    // type="password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button type="button" onClick={toggleConfirmPasswordVisibility} className="togglePassword">
                                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </button>
                            </div>


                            <input
                                type="submit"
                                value="Change"
                                className="updatePasswordBtn"
                            />
                        </form>
                    </div>
                </div>


            </Fragment>}
        </Fragment>
    )
}

export default UpdatePassword   