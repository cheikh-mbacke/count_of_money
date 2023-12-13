import React, {useState} from 'react';
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
            try {
                const user = await userService.Login(values);
                dispatch(login(user));
                navigate("/profile");
            } catch (error) {
                console.error('Error logging in:', error);
            }
        },
    });

    const handleClick = () => {
        window.location.href = 'http://localhost:3001/api/users/auth/google/initiate?authType=signin'
    };

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
                </form>
                <div className="flex flex-row justify-center mt-4 px-4 py-2 rounded">
                    <button
                        onClick={handleClick}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                        Se connecter avec Google
                    </button>
                </div>
                <p className="mt-6 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/signup" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                        Sign up now
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default Login;