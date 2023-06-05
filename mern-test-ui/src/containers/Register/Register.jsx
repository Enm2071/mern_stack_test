import React from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import "./Register.style.css";
import useRegister from "../../hooks/useRegister";
import actionTypes from "../../actions/actionTypes";
import {
    useNavigate,
} from "react-router-dom";

const Register = () => {
    const {
        register,
        setEmail,
        setPassword,
        setName,
        email,
        password,
        name,
    } = useRegister();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state);

    const onChangeHandler = onChange => event => {
        onChange(event.target.value);
    }

    const conClickHandler = async () => {
        try {
            dispatch({
                type: actionTypes.SIGN_UP,
            })
            const response = await register();
            if (!response){
                throw new Error("No response");
            };
            
            dispatch({
                type: actionTypes.SIGN_UP_SUCCESS,
                payload: response,
            })
            navigate("/login");
        } catch (error) {
            dispatch({
                type: actionTypes.SIGN_UP_FAILURE,
                payload: error.message,
            })
        }
    }

    return (
        <div className="Register">
            <h1>Sign up</h1>
            <div className="Register-content">
                <div className="Register-form">
                    <div className="Register-form--fields">
                        <input type="text" placeholder="Name" onChange={onChangeHandler(setName)} value={name} />
                        <input type="email" placeholder="Email" onChange={onChangeHandler(setEmail)} value={email} />
                        <input type="password" placeholder="Password" onChange={onChangeHandler(setPassword)} value={password} />
                    </div>
                    <div className="Register-form--actions">
                        <button type="button" onClick={conClickHandler} disabled={loading}>{loading ? "loading..." : "Register"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;