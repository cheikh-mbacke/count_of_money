import React from "react";
import {Link} from "react-router-dom";
const Coinitem = (props) => {
    return(
        <div className="flex justify-between items-center bg-gray-800 shadow-lg shadow-green-300 rounded-lg m-8 p-4 hover:scale-105 transition-all duration-300 ease-in-out">

            <p>{props.coins.market_cap_rank}</p>
            <div className="flex items-center">
                <img src={props.coins.image} className="h-8 mr-3 w-auto" alt=""/>
                <p>{props.coins.symbol.toUpperCase()}</p>
            </div>
            <p>${props.coins.current_price.toLocaleString()}</p>
            <p>{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
            <p className="hidden md:block">${props.coins.total_volume.toLocaleString()}</p>
            <p className="hidden md:block">${props.coins.market_cap.toLocaleString()}</p>
            <div className="hidden md:flex justify-between items-center space-x-4">
                <Link to={`/coin/${props.coins.id}`}>Details</Link>
                <Link to={`/trade/${props.coins.id}`}>Trade</Link>
            </div>
        </div>
    )
}
export default Coinitem