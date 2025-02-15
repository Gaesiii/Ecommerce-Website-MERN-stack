import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css"
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUpdatedUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
// import { loadUser } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import CakeIcon from "@material-ui/icons/Cake";

const UpdateProfile = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const alert = useAlert();

    const { user } = useSelector((state) => state.user);

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(/*user.avatar*/);
    const [avatarPreview, setAvatarPreview] = useState("/profilePng.png");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [birthDate, setBirthDate] = useState("");

    // const oldAvatarUrl = user.avatar.url;
    // const oldAvatarId = user.avatar.public_id;

    // const [avatar2, setAvatar2] = useState(user.avatar)




    const updateProfileSubmit = async (e) => {
        e.preventDefault();

        // const avatar2 = user.avatar;
        // const avatarUrl = user.avatar


        if (avatar) {
            const myForm = new FormData();

            myForm.append("name", name);
            myForm.append("email", email);

            myForm.append("avatar", avatar);
            myForm.append("phoneNumber", phoneNumber);
            myForm.append("address", address);
            myForm.append("birthDate", birthDate);

            dispatch(updateProfile(myForm));
        }

        else {
            // myForm.append("avatar2", avatar2)
            // myForm.append("avatarUrl", user.avatar.url);
            // myForm.append("avatarPublicId", user.avatar.public_id);
            window.alert('Please Enter an Image');


            // myForm.append("oldAvatarUrl", oldAvatarUrl);
            // myForm.append("oldAvatarId", oldAvatarId);
        }




        // console.log("Button Update Clicked:", name);
        // console.log("Button Update Clicked", email);

        // console.log("Button Update Clicked AVatar Cũ", user.avatar.url);
        // console.log("Button Update Clicked AvatarPrivew mới", avatarPreview);
        // console.log("Button Update Clicked Avatar mới", avatar);
        // console.log("Button Updated Clicked OldAvatarId", oldAvatarId);
        // console.log("Button Update Clicked OldAvatarUrl", oldAvatarUrl);


        // console.log("Button Update Clicked", avatar2);
        // console.log("Button Update Clicked", user.avatar.url);
        // console.log("Button Update Clicked", user.avatar.public_id);


        //     try {
        //         await dispatch(updateProfile(myForm));
        //     }
        //     catch (error) {
        //         console.error("Update error:", error);
        //     }
    };

    const updateProfileDataChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);

    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            setAddress(user.address);
            setBirthDate(user.birthDate);

            // if (user && user.avatar && user.avatar.url) {
            //     setAvatarPreview(user.avatar.url);
            // } else {
            //     setAvatarPreview("/profilePng.png");
            // }

            // setAvatarPreview(user.avatar.url);



            setAvatarPreview("/profilePng.png");

            // setAvatar(user.avatar.url);
        }
        if (error) {
            alert.error(error);

            console.log(user.name);
            console.log(user.email);
            console.log(user.avatar);

            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            // dispatch(loadUser());
            dispatch(loadUpdatedUser());
            navigate("/account")
            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }

    }, [dispatch, error, alert, navigate, user, isUpdated]);

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Update Profile" />
                <div className="updateProfileContainer">
                    <div className="updateProfileBox">
                        <h2 className="updateProfileHeading">Update Profile</h2>
                        <form
                            className="updateProfileForm"
                            encType="multipart/form-data"
                            onSubmit={updateProfileSubmit}
                        >
                            <div className="updateProfileName">
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name /*|| ''*/}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="updateProfileEmail">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email /*|| ''*/}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>


                            <div className="updateProfilePhoneNumber">
                                <PhoneIcon />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    required
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="updateProfileAddress">
                                <HomeIcon />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    required
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>


                            <div className="updateProfileBirthDate">
                                <CakeIcon />
                                <input
                                    type="date"
                                    placeholder="Birth Date"
                                    required
                                    name="birthDate"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </div>




                            <div id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                {/* <img src={user && user.avatar && user.avatar.url ? user.avatar.url : avatarPreview} alt="" /> */}
                                {/* <img src={user?.avatar.url || avatarPreview} alt="Avatar Preview" /> */}
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProfileDataChange}
                                // onChange={(e) => setAvatar(e.target.files[0])}
                                />
                            </div>


                            <input
                                type="submit"
                                value="Update"
                                className="updateProfileBtn"
                            />
                        </form>
                    </div>
                </div>


            </Fragment>}
        </Fragment>
    );
};

export default UpdateProfile