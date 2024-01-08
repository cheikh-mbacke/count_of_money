import React from "react";

const LoaderComponent = ({ loading }) => {
    return (
        loading && (
            <div className="fixed top-40 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="flex items-center">
                    <div className="loader ease-linear rounded-full border-t-8 border-blue-500 border-r-8 border-b-8 border-gray-200 h-16 w-16 mr-3"></div>
                    <div className="text-white text-lg">Loading...</div>
                </div>
            </div>
        )
    );
};

export default LoaderComponent;
