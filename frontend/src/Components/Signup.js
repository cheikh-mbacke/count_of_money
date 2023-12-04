// RegisterForm.js

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
    const validationSchema = Yup.object({
        pseudo: Yup.string().required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required')
            .test(
                'pseudoEmail',
                'Email must start with "user" and end with "@example.com"',
                (value) => /^user.*@example\.com$/.test(value)
            ),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            pseudo: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Replace the alert with your actual registration logic
            alert(`Registration successful!\nPseudo: ${values.pseudo}\nEmail: ${values.email}\nPassword: ${values.password}`);
        },
    });

    return (
        <div className="flex-grow bg-black">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-8 bg-black text-white p-8 rounded shadow-md">
            <div className="mb-4 flex items-center">
                <label htmlFor="pseudo" className="w-2/5 block text-sm font-bold mr-2">
                    Pseudo:
                </label>
                <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pseudo}
                    className={`form-input ${formik.touched.pseudo && formik.errors.pseudo ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:border-blue-500 px-3 py-2 rounded`}
                />
                {formik.touched.pseudo && formik.errors.pseudo && (
                    <div className="text-red-500 text-sm ml-2">{formik.errors.pseudo}</div>
                )}
            </div>

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
                    className={`form-input ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:border-blue-500 px-3 py-2 rounded`}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm ml-2">{formik.errors.email}</div>
                )}
            </div>

            <div className="mb-4 flex items-center">
                <label htmlFor="password" className="w-2/5 block text-sm font-bold mr-2">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={`form-input ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:border-blue-500 px-3 py-2 rounded`}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm ml-2">{formik.errors.password}</div>
                )}
            </div>

            <div className="mb-4 flex items-center">
                <label htmlFor="confirmPassword" className="w-2/5 block text-sm font-bold mr-2">
                    Confirm Password:
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className={`form-input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:border-blue-500 px-3 py-2 rounded`}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="text-red-500 text-sm ml-2">{formik.errors.confirmPassword}</div>
                )}
            </div>

            <button
                type="submit"
                className="flex bg-blue-500 text-white justify-center px-4 py-2 rounded focus:outline-none hover:bg-blue-700 mx-auto mt-3"
            >
                Register
            </button>
        </form>
        </div>
    );
};

export default Signup;
