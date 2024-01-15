import React from 'react';
import {Link} from 'react-router-dom';
import {FaSadTear} from 'react-icons/fa'; // Importez l'icône de React Icons

const NonConnect = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="flex space-x-3">
                <FaSadTear className="text-6xl text-green-900 mb-4"/>
                <h1 className="text-2xl font-bold text-green-900 mt-5">OPPS, you're not connected</h1>
            </div>
            <p className="text-gray-600 mb-6">You need to be logged in to access this content. Please login or register
                to proceed.</p>
            <p className="text-gray-600 mb-6">Or choose to go back to Market</p>
            <div className="space-x-3">
                <Link to="/dashbord" className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded">
                    Go to Market
                </Link>
                <Link to="/login" className="text-white bg-green-500 hover:bg-green-700 font-medium py-2 px-4 rounded">
                    Login
                </Link>
                <Link to="/register" className="text-white bg-red-500 hover:bg-red-700 font-medium py-2 px-4 rounded">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default NonConnect;
