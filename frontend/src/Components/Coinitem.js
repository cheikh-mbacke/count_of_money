import React from "react";
const Coinitem = (props) => {
    return(
        <div className="flex justify-between items-center bg-gray-800 shadow-lg shadow-green-300 rounded-lg m-8 p-4 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
            <p>{props.coins.market_cap_rank}</p>
            <div className="flex items-center">
                <img src={props.coins.image} alt="coin-image" className="h-8 mr-3 w-auto"/>
                <p>{props.coins.symbol.toUpperCase()}</p>
            </div>
            <p>${props.coins.current_price.toLocaleString()}</p>
            <p>{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
            <p className="hidden md:block">${props.coins.total_volume.toLocaleString()}</p>
            <p className="hidden md:block">${props.coins.market_cap.toLocaleString()}</p>
        </div>
    )
}
export default Coinitem