// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../Assets/Images/logo.png"

const Header = () => {
    return (
        <header className="bg-gradient-to-br from-green-400 via-black to-black">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/">
                        <img src={Logo} alt="logo-site" className="w-20 h-20" />
                    </Link>
                </div>

                <div className="flex space-x-6 w-1/2">
                    <Link to="/">
                        <div className="acc-1 text-white text-xl font-bold font-serif mx-4">Home</div>
                    </Link>

                    <Link to="/About">
                        <div className="abou-1 text-white text-xl font-bold font-serif mx-4">About Us</div>
                    </Link>

                    <Link to="/Contact">
                        <div className="cont-1 text-white text-xl font-bold font-serif mx-4">Contact Us</div>
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/login">
                        <button className="text-xl text-white px-4 py-2 transition duration-300">Login</button>
                    </Link>

                    <Link to="/signup">
                    <button className="text-xl border rounded-full px-4 py-2 bg-green-500 hover:bg-green-700 transition duration-300">Signup</button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;