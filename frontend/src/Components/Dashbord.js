import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from "axios";
import Coinitem from "./Coinitem";
import Coin from "./Coin";


const Dashbord = () => {
    const [coins, setCoins] = useState([])
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en`

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setCoins(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return(
        <div className="flex-grow bg-black">
            <Link to="/dashbord">
                <div className="flex items-center justify-center">
                    <FontAwesomeIcon icon={faCoins} className="text-green-500 text-3xl"/>
                    <h1 className="text-white">Your <span className="text-green-500">DashBoard</span></h1>
                </div>
            </Link>
            
            <div className="max-w-7xl m-auto text-white">
                <div>
                    <div className="flex justify-between items-center bg-gray-800 shadow-lg shadow-green-500 rounded-lg m-8 p-4 font-bold">
                        <p>#</p>
                        <p className="ml-[-4rem]">Coins</p>
                        <p>Price</p>
                        <p>24h</p>
                        <p className="hidden md:block">Volume</p>
                        <p className="hidden md:block">Market Cap</p>
                    </div>

                    {
                        coins.map( coins => {
                            return (
                                <Link to={`/coin/${coins.id}`} element={<Coin/>} key={coins.id}>
                                    <Coinitem coins = {coins}/>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashbord