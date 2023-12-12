import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import userService from "../Actions/User";
import {Link, useNavigate} from "react-router-dom";
import crypto from "../Assets/Images/cryptocurrancy.png"
import {login} from "../Actions/authActions";
import { useDispatch } from 'react-redux';

const Login = () => {
    const [authStatus, setAuthStatus] = useState(null); // 'null', 'loading', 'authenticated', 'error'
    const [userDetails, setUserDetails] = useState(null);
    const [token, setToken] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const user = await userService.Login(values)
            dispatch(login(user));
            navigate("/profile");

        },
    });

    const handleClick = () => {

        setAuthStatus('loading'); // Set loading status

        // Redirect to the backend endpoint for Google login
        window.open('http://localhost:3000/api/users/auth/google/initiate?authType=signin');
    };

    const handleCallback = () => {
        // Check if there is an authentication code in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Call the backend authentication function
            handleBackendAuthentication(code);
        }
    };

    useEffect(() => {
        handleCallback();
    }, []);

    const handleBackendAuthentication = async (code) => {
        try {
            // Make a request to your backend to handle Google login
            const response = await fetch('http://localhost:3000/api/users/auth/google/initiate?authType=signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (response.ok) {
                setAuthStatus('authenticated');
                setUserDetails(data);
                setToken(data.token);
            } else {
                // Handle specific error cases
                if (response.status === 401) {
                    setAuthStatus('error');
                    console.error('Authentication failed: Invalid credentials.');
                } else if (response.status === 500) {
                    setAuthStatus('error');
                    console.error('Authentication failed: Internal server error.');
                } else {
                    setAuthStatus('error');
                    console.error('Authentication failed. Status:', response.status);
                }
            }
        } catch (error) {
            setAuthStatus('error');
            console.error('Error handling backend authentication:', error);
        }
    };

    const buttonText =
        authStatus === 'loading'
            ? 'Loading...'
            : authStatus === 'authenticated'
                ? 'Authenticated'
                : 'Se connecter avec Google';

    const buttonStyle =
        authStatus === 'loading'
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-500 hover:bg-gray-700 text-white';

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-grow items-center justify-center bg-black ">
            <div className="w-1/2 p-8 max-w-md">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-900">
                    The easiest way to invest</h2>
                <p className="text-white">Trade between multiple asset classes from one convenient account.
                    A large number of assets are now less than a minute away.</p>
                <img src={crypto} alt={"cryptocurrencies logo"}/>
            </div>

            <div className="w-1/2">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-900">
                    Log in to Count_Of_Money
                </h2>

                <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-20 text-white rounded ">
                    <div className="mb-4 flex flex-col">
                        <div className="flex items-center">
                            <label htmlFor="email" className="w-2/5 block text-sm font-bold mr-2">
                                Email:
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`form-input ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:border-blue-500 px-3 py-2 rounded text-black w-3/5`}
                            />
                        </div>
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-center text-red-500 text-sm ml-2">{formik.errors.email}</div>
                            )}
                    </div>

                    <div className="mb-4 flex flex-col ">
                        <div className="flex items-center">
                            <label htmlFor="password" className="w-2/5 block text-sm font-bold mr-2">
                                Password:
                            </label>
                            <div className="relative w-3/5">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className={`form-input ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:border-blue-500 px-3 py-2 rounded text-black w-full`}
                                />
                                <button
                                    type="button"
                                    onClick={handleTogglePassword}
                                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-300 focus:outline-none"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-center text-red-500 text-sm ml-2">{formik.errors.password}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="flex bg-green-500 text-white justify-center px-4 py-2 rounded focus:outline-none hover:bg-green-700 mx-auto my-auto">
                        Log in
                    </button>
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/signup" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                            Sign up now
                        </Link>
                    </p>
                </form>
                <div className="flex flex-row justify-center mt-4 px-4 py-2 rounded">
                    <button onClick={handleClick} className={`font-bold py-2 px-4 rounded ${buttonStyle}`}>
                        <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Login;