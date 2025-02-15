import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, redirect } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import PhoneIcon from "@material-ui/icons/Phone";
import DateRangeIcon from "@material-ui/icons/DateRange";
import HomeIcon from "@material-ui/icons/Home";


const LoginSignUp = (location) => {

    const [showPassword, setShowPassword] = useState(false);

    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const toggleRegisterPasswordVisibility = (event) => {
        event.preventDefault();
        setShowRegisterPassword(!showRegisterPassword);
    };

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const alert = useAlert();

    const { error, loading, isAuthenticated } = useSelector(state => state.user)

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        birthDate: "",
        address: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/profilePng.png");

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("name", user.name);
        myForm.append("email", user.email);
        myForm.append("password", user.password);
        myForm.append("avatar", avatar);
        myForm.append("phoneNumber", user.phoneNumber);
        myForm.append("birthDate", user.birthDate);
        myForm.append("address", user.address);
        try {
            await dispatch(register(myForm));
        }
        catch (error) {
            console.error("Register error:", error);
        }



    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(redirect)
        }

    }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

    const switchTabs = (e, tab) => {
        if (switcherTab.current && loginTab.current && registerTab.current) {

            if (tab === "login") {
                switcherTab.current.classList.add("shiftToNeutral");
                switcherTab.current.classList.remove("shiftToRight");

                registerTab.current.classList.remove("shiftToNeutralForm");
                loginTab.current.classList.remove("shiftToLeft");
            }
            if (tab === "register") {
                switcherTab.current.classList.add("shiftToRight");
                switcherTab.current.classList.remove("shiftToNeutral");

                registerTab.current.classList.add("shiftToNeutralForm");
                loginTab.current.classList.add("shiftToLeft");

            }

        }


    };


    // useEffect(() => {
    //     switchTabs()
    // }, []);





    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                        <div>
                            <div className="login_signUp_toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                            <div className="loginEmail">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input
                                    // type="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    className="passwordInput"
                                />
                                <button type="button" onClick={togglePasswordVisibility} className="togglePassword">
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </button>
                            </div>
                            <Link to="/password/forgot">Forget Password ?</Link>
                            <input type="submit" value="Login" className="loginBtn" />
                        </form>




                        <form
                            className="signUpForm"
                            ref={registerTab}
                            encType="multipart/form-data"
                            onSubmit={registerSubmit}
                        >
                            <div className="signName">
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpEmail">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpPassword">
                                <LockOpenIcon />
                                <input
                                    // type="password"
                                    type={showRegisterPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                                <button type="button" onClick={toggleRegisterPasswordVisibility} className="toggleRegisterPassword">
                                    {showRegisterPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </button>

                            </div>

                            <div className="signUpPhoneNumber">
                                <PhoneIcon />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    required
                                    name="phoneNumber"
                                    value={user.phoneNumber}
                                    onChange={registerDataChange}
                                />
                            </div>

                            <div className="signUpBirthDate">
                                <DateRangeIcon />
                                <input
                                    type="date"
                                    placeholder="Birth Date"
                                    required
                                    name="birthDate"
                                    value={user.birthDate}
                                    onChange={registerDataChange}
                                />
                            </div>

                            <div className="signUpAddress">
                                <HomeIcon />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    required
                                    name="address"
                                    value={user.address}
                                    onChange={registerDataChange}
                                />
                            </div>


                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Register"
                                className="signUpBtn"
                            />
                        </form>
                    </div>
                </div>

            </Fragment>}
        </Fragment>
    )
};
export default LoginSignUp