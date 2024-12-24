import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../CSS/SignIn.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { login, register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const initialStateErrors = {
        email: { required: false, message: "" },
        password: { required: false, message: "" },
        custom_error: null,
    };

    const [errors, setErrors] = useState(initialStateErrors);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleClick_logo = () => {
        navigate("/");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        let hasError = false;
        let tempErrors = { ...initialStateErrors };

        // Validate inputs
        if (inputs.email === "") {
            hasError = true;
            tempErrors.email.required = true;
        }
        if (inputs.password === "") {
            hasError = true;
            tempErrors.password.required = true;
        }

        if (!hasError) {
            setLoading(true);
            let { email, password } = inputs;
            await register(email, password).then((response) => {
                console.log(response)
            }).catch((err) => {
                if (err.response.data.error.message === "EMAIL_EXISTS") {
                    setErrors({ ...errors, custom_error: "This email is already registered." });
                } else if (String(err.response.data.error.message)) {
                    setErrors({ ...errors, custom_error: "Password should be at least 6 characters." });
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setErrors(tempErrors); // Update with validation errors
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        let hasError = false;
        let tempErrors = { ...initialStateErrors };

        // Validate inputs
        if (inputs.email === "") {
            tempErrors.email.required = true;
            hasError = true;
        }
        if (inputs.password === "") {
            tempErrors.password.required = true;
            hasError = true;
        }

        if (!hasError) {
            setLoading(true);
            let { email, password } = inputs;
            await login(email, password).then((response) => {
                console.log(response)
                navigate('/')
            }).catch((error) => {
                if (error.code === "ERR_BAD_REQUEST") {
                    tempErrors.custom_error = "Invalid Credentials"; // Set custom error for invalid credentials
                }
            }).finally(() => {
                setLoading(false);
                setErrors(tempErrors); // Update errors with response from API
            })
        } else {
            setErrors(tempErrors); // Update with validation errors
        }
    }

    return (
        <div className='login'>
            <div className='login-box'>
                <img
                    className="login__logo"
                    src='/images/logo9.png'
                    onClick={handleClick_logo}
                />
                <div className='login__container'>
                    <h1>Sign-in</h1>
                    <form>
                        <h5>E-mail</h5>
                        <input 
                            type='text' 
                            name='email' 
                            onChange={handleInput} 
                            placeholder='Enter Email' 
                        />
                        {errors.email.required && (
                            <span style={{ color: "red" }}>
                                Email is required.
                            </span>
                        )}

                        <h5>Password</h5>
                        <input 
                            type='password' 
                            name='password' 
                            onChange={handleInput} 
                            placeholder='Enter Password' 
                        />
                        {errors.password.required && (
                            <span style={{ color: "red" }}>
                                Password is required.
                            </span>
                        )}
                         {errors.custom_error && !errors.password.required && (
                            <span style={{ color: "red" }}>
                                {errors.custom_error}
                            </span>
                        )}

                        {loading && (
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}

                        <button
                            type='submit'
                            onClick={handleSignIn}
                            className='login__signInButton'
                            disabled={loading}
                        >
                            Sign In
                        </button>
                    </form>

                    <p>
                        By signing-in you agree to the PURPLE TREE Conditions of Use & Sale. Please
                        see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.
                    </p>

                    <button onClick={handleRegister} className='login__registerButton'>
                        Create your Amazon Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
