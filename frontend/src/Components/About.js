import React from 'react';

function AboutUs() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
            <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-black">
                <h1 className="text-white text-3xl font-bold mb-4">About Us</h1>
                <p className="text-white text-lg">
                    At Count of Money, we're more than just a cryptocurrency trading platform; we're a hub for digital currency enthusiasts, traders, and investors alike. Established with the vision of making cryptocurrency trading accessible, reliable, and secure for everyone, we've dedicated ourselves to demystifying the world of digital currencies and bringing them into the mainstream.                </p>
            </div>
        </div>
    );
}

export default AboutUs;
