import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import userService from "../Actions/User";

const Login = () => {
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
        onSubmit: (values) => {
            // Handle form submission logic
            userService.Login(values)
                .then(r => console.log("avec succes"))
                .catch(error => console.log("Error",error))
            console.log(values);
        },
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex-grow bg-black">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-20 text-white rounded ">
            <div className="mb-4 flex items-center">
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
                {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm ml-2">{formik.errors.email}</div>
                )}
            </div>

            <div className="mb-4 flex items-center relative">
                <label htmlFor="password" className="w-2/5 block text-sm font-bold mr-2">
                    Password:
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={`form-input ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:border-blue-500 px-3 py-2 rounded text-black w-2/5`}
                />
                <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-white focus:outline-none w-1/5"
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
                {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm ">{formik.errors.password}</div>
                )}
            </div>

            <button
                type="submit"
                className="flex bg-green-500 text-white justify-center px-4 py-2 rounded focus:outline-none hover:bg-green-700 mx-auto my-auto">
                Login
            </button>

        </form>
        </div>
    );
};
export default Login;