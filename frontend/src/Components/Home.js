import React from 'react';
import Video from '../Assets/Videos/video-unscreen.gif';

const Home = () => {
    return (
        <div className="flex flex-grow flex-col items-center justify-center bg-black text-white p-6">
            <div className="text-center text-5xl font-serif mb-6">
                <span className="text-green-500">Trade</span>
                <span className=""> </span>
                <span className="text-white">Crypto Better</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center w-full max-w-6xl mx-auto">
                <div className="lg:w-1/2 text-center lg:text-left lg:pr-10">
                    <div className="text-4xl font-serif mb-5">
                        Simple, one-step trading…
                    </div>
                    <div className="text-4xl font-serif mb-5">
                        <span className="text-white">Count-of-money is the</span>
                        <span className=""> </span>
                        <span className="text-green-500">easiest way to buy & sell </span>
                        <span className="text-white">cryptocurrency.</span>
                    </div>
                    <div className="text-3xl font-serif mb-5">
            <span className="text-white">
              Unlike any other platform, we allow you to trade
            </span>
                        <span className=""> </span>
                        <span className="text-green-500">in just one</span>
                        <span className=""> </span>
                        <span className="text-white">step between any supported asset.</span>
                    </div>
                    <div className="text-3xl font-serif mb-5">
                        <span className="text-white">For example, Bitcoin to XRP, is</span>
                        <span className=""> </span>
                        <span className="text-green-500">one seamless trade</span>
                        <span className=""> </span>
                        <span className="text-white">
              that you won't find anywhere else.
            </span>
                    </div>
                </div>

                <div className="lg:w-1/2 mt-6 lg:mt-0">
                    <img
                        src={Video}
                        alt="Animation GIF"
                        className="rounded-lg shadow-lg max-w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
