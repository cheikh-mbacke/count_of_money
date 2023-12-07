import React from 'react';
import Video from "../Assets/Videos/video-unscreen.gif"

const Home = () => {
    return (
        <div className=" flex-grow bg-black">
            <div className="flex items-center mt-6 max-w-md mx-auto my-auto text-5xl font-serif break-words">
                <span className= "text-green-500">Trade</span>
                <span className="">a</span>
                <span className="text-white">Crypto Better</span>
            </div>
            <div className="w-1/4 text-left text-white text-4xl font-serif break-words mt-5">Simple, one-step trading…</div>
            <div className="w-1/4 text-left text-4xl font-serif break-words mt-5">
                <span className="text-white">Count-of-money is the</span>
                <span className=""> </span>
                <span className="text-green-500">easiest way to buy & sell </span>
                <span className="text-white">cryptocurrency.</span>
            </div>
            <div className="w-1/4 text-left text-3xl font-serif break-words mt-5">
                <span className="text-white">Unlike any other platform, we allow you to trade</span>
                <span className=""> </span>
                <span className="text-green-500">in just one</span>
                <span className=""> </span>
                <span className="text-white">step between any supported asset.</span>
            </div>
            <div className="w-1/4 text-left text-3xl font-serif break-words mt-5 left-1/4">
                <span className="text-white">For example, Bitcoin to XRP, is</span>
                <span className=""> </span>
                <span className="text-green-500">one seamless trade</span>
                <span className=""> </span>
                <span className="text-white">that you won't find anywhere else.</span>
            </div>
            <div className="absolute left-2/4 top-1/4 rounded-lg mx-auto my-auto" >
                <img src={Video} alt="Animation GIF"/>
            </div>
        </div>
    );
};

export default Home;