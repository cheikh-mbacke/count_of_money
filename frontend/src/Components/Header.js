import React, {useEffect, Fragment} from 'react';
import { Link, NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout } from '../Actions/authActions';
import Logo from "../Assets/Images/logo11.png"
import { Menu, Transition } from '@headlessui/react'
import Cookies from 'js-cookie'

const Header = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        Cookies.remove('user');
        Cookies.remove('userLogin');
        dispatch(logout());
    };

     useEffect(()=> {
         try {
             const cookieGoogle = Cookies.get('user')
             const cookieLogin = Cookies.get('userLogin')

             if (cookieGoogle){
                 const userJSON = decodeURIComponent(cookieGoogle);
                 const storedUserCookie = JSON.parse(userJSON);
                 dispatch(login(storedUserCookie))
             } else if (cookieLogin){
                 const userJSON = decodeURIComponent(cookieLogin);
                 const storedUserCookie = JSON.parse(userJSON);
                 dispatch(login(storedUserCookie))
             }
         }catch (error) {
             console.error('Error parsing user data:', error);
         }

     }, [])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <header className="bg-gradient-to-br from-green-400 via-black to-black">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/">
                        <img src={Logo} alt="logo-site" className="w-20 h-20" />
                    </Link>
                </div>

                <div className="flex space-x-6 w-1/2">
                    <NavLink to="/" className="text-white text-xl font-bold font-serif mx-4" activeClassName="underline">
                        Home
                    </NavLink>
                    <NavLink to="/about" className="text-white text-xl font-bold font-serif mx-4" activeClassName="underline">
                        About Us
                    </NavLink>
                    <NavLink to="/contact" className="text-white text-xl font-bold font-serif mx-4" activeClassName="underline">
                        Contact Us
                    </NavLink>
                </div>

                <div className="flex space-x-4">
                    {!user ? (
                        <>
                            <NavLink to="/login" className="text-xl text-white px-4 py-2 transition duration-300">
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="text-xl rounded-full px-4 py-2 bg-green-500 hover:bg-green-700 transition duration-300"
                            >
                                Signup
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only text-white">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink to="/profile"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Your Profile
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink to="/dashbord"
                                                         className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    DashBoard
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink to="/login"
                                                    onClick={handleLogout}
                                                         className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Sign out
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
