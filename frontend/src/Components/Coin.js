import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const Coin = () => {
    const params = useParams()
    const [coin, setCoin] = useState({})
    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setCoin(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [url])

    return (
        <div className="flex-grow bg-black text-white">
            <NavLink to="/dashbord">
                <FontAwesomeIcon icon={faArrowLeft}  className="m-5 text-green-300"/>
            </NavLink>

            <NavLink to={`/trade/${coin.id}`}>
                <button className="block md:hidden mx-auto justify-center bg-gray-800 shadow-lg shadow-green-500 text-white py-2 px-4 rounded-lg mt-4">Trade</button>
            </NavLink>

            <div className="max-w-3xl my-4 mx-auto py-3 px-4 flex flex-col">
                <div className="max-w-3xl my-4 py-3 px-4 flex flex-col items-center bg-gray-800 shadow-lg shadow-green-500 rounded-lg">
                    <h1>{coin.name}</h1>
                </div>

                <div className="max-w-3xl my-4 py-3 px-4 flex flex-col bg-gray-800 shadow-lg shadow-green-500 rounded-lg">
                    <div className="my-2 mx-0">
                        <span className="border border-solid border-green-500 bg-green-500 shadow-lg shadow-gray-400 rounded-lg p-1">Rank # {coin.market_cap_rank}</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="flex items-center my-1 mx-0">
                            {
                                coin.image ?
                                    <img src={coin.image.small} alt=""/>
                                    :
                                    null
                            }
                            <p className="px-4">{coin.name}</p>
                            <p className="px-4">{
                                coin.symbol ?
                                    coin.symbol.toUpperCase()
                                    :
                                    null
                            }/USD
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            {
                                coin.market_data ?
                                    <h1>${
                                        coin.market_data.current_price ?
                                            coin.market_data.current_price.usd.toLocaleString()
                                            :
                                            null
                                    }
                                    </h1>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl my-4  py-3 px-4 flex flex-col bg-gray-800 shadow-lg shadow-green-500 rounded-lg">
                    <table className="my-2 mx-0">
                        <thead>
                        <tr>
                            <th className="p-1 md:p-2 text-center bg-gray-600">1h</th>
                            <th className="p-1 md:p-2 text-center bg-gray-600">24h</th>
                            <th className="p-1 md:p-2 text-center bg-gray-600">7d</th>
                            <th className="p-1 md:p-2 text-center bg-gray-600">14d</th>
                            <th className="p-1 md:p-2 text-center bg-gray-600">30d</th>
                            <th className="p-1 md:p-2 text-center bg-gray-600">1yr</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {
                                coin.market_data ?
                                    <>
                                        <td className="p-1 md:p-2 text-center">{
                                            coin.market_data.price_change_percentage_1h_in_currency ?
                                                coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2).toLocaleString()
                                                :
                                                null
                                        }%</td>
                                        <td className="p-1 md:p-2 text-center">{
                                            coin.market_data.price_change_percentage_24h_in_currency ?
                                                coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2).toLocaleString()
                                                :
                                                null
                                        }%</td>
                                        <td className="p-1 md:p-2 text-center">{
                                            coin.market_data.price_change_percentage_7d_in_currency ?
                                                coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2).toLocaleString()
                                                :
                                                null
                                        }%</td>
                                        <td className="p-1 md:p-2 text-center">{
                                            coin.market_data.price_change_percentage_14d_in_currency ?
                                                coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(2).toLocaleString()
                                                :
                                                null
                                        }%</td>
                                        <td className="p-1 md:p-2 text-center">{
                                            coin.market_data.price_change_percentage_30d_in_currency ?
                                                coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(2).toLocaleString()
                                                :
                                                null

                                        }%</td>
                                        <td className="p-1 md:p-2 text-center">{
                                            coin.market_data.price_change_percentage_1y_in_currency ?
                                                coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1).toLocaleString()
                                                :
                                                null

                                        }%</td>
                                    </>
                                    :
                                    null
                            }
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="max-w-3xl my-4  py-3 px-4 flex flex-col bg-gray-800 shadow-lg shadow-green-500 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                        {
                            coin.market_data ?
                                <>
                                    <div>
                                        <div className="flex justify-between border-b border-solid border-gray-500 my-1 mx-0 pb-1">
                                            <h4>24 Hours Low</h4>
                                            {
                                                coin.market_data.low_24h ?
                                                    <p className="text-green-300">$ {coin.market_data.low_24h.usd.toLocaleString()}</p>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="flex justify-between border-b border-solid border-gray-500 my-1 mx-0 pb-1">
                                            <h4>24 Hour High</h4>
                                            {
                                                coin.market_data.high_24h ?
                                                    <p className="text-green-300">$ {coin.market_data.high_24h.usd.toLocaleString()}</p>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between border-b border-solid border-gray-500 my-1 mx-0 pb-1">
                                            <h4>Market Cap</h4>
                                            {
                                                coin.market_data.market_cap ?
                                                    <p className="text-green-300">$ {coin.market_data.market_cap.usd.toLocaleString()}</p>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="flex justify-between border-b border-solid border-gray-500 my-1 mx-0 pb-1">
                                            <h4>Circulating supply</h4>
                                            <p className="text-green-300">{coin.market_data.circulating_supply.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </>
                                :
                                null
                        }
                    </div>
                </div>

                <div className="max-w-3xl my-4  py-3 px-4 flex flex-col bg-gray-800 shadow-lg shadow-green-500 rounded-lg">
                    <div>
                        <h3 className="my-2 mx-0">About</h3>
                        <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),
                        }}
                        >
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coin