import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify"

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
    }, [])

    return (
        <div className="flex-grow bg-black text-white">
            <div className="max-w-3xl my-4 mx-auto py-3 px-4 flex flex-col">
                <div className="max-w-3xl my-4 mx-auto py-3 px-4 flex flex-col bg-gray-800 shadow-lg shadow-green-500 rounded-lg">
                    <h1>{coin.name}</h1>
                </div>

                <div className="max-w-3xl my-4 mx-auto py-3 px-4 flex flex-col bg-gray-800 shadow-lg shadow-green-500 rounded-lg">
                    <div>
                        <span>Rank # {coin.market_cap_rank}</span>
                    </div>
                    <div>
                        <div>
                            {
                                coin.image ?
                                    <img src={coin.image.small} alt=""/>
                                    :
                                    null
                            }
                            <p>{coin.name}</p>
                            <p>{coin.symbol}</p>
                        </div>
                        <div>
                            {
                                coin.market_date ?
                                    <h1>
                                        {
                                            coin.market_date.current_price ?
                                                coin.market_date.current_price.useDefaults
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

                <div className="max-w-3xl my-4 mx-auto py-3 px-4 flex flex-col bg-gray-800 shadow-lg shadow-green-500 rounded-lg">
                    <table>
                        <thead>
                        <tr>
                            <th>1h</th>
                            <th>24h</th>
                            <th>7d</th>
                            <th>14d</th>
                            <th>30d</th>
                            <th>1yr</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {
                                coin.market_data ?
                                    <>
                                        <td>{
                                            coin.market_data.price_change_percentage_1h_in_currency ?
                                                coin.market_data.price_change_percentage_1h_in_currency.usd
                                                :
                                                null
                                        }</td>
                                        <td>{
                                            coin.market_data.price_change_percentage_24h_in_currency ?
                                                coin.market_data.price_change_percentage_24h_in_currency.usd
                                                :
                                                null
                                        }</td>
                                        <td>{
                                            coin.market_data.price_change_percentage_7d_in_currency ?
                                                coin.market_data.price_change_percentage_7d_in_currency.usd
                                                :
                                                null
                                        }</td>
                                        <td>{
                                            coin.market_data.price_change_percentage_14d_in_currency ?
                                                coin.market_data.price_change_percentage_14d_in_currency.usd
                                                :
                                                null
                                        }</td>
                                        <td>{
                                            coin.market_data.price_change_percentage_30d_in_currency ?
                                                coin.market_data.price_change_percentage_30d_in_currency.usd
                                                :
                                                null

                                        }</td>
                                        <td>{
                                            coin.market_data.price_change_percentage_1yd_in_currency ?
                                                coin.market_data.price_change_percentage_1y_in_currency.usd
                                                :
                                                null

                                        }</td>
                                    </>
                                    :
                                    null
                            }
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="max-w-3xl my-4 mx-auto py-3 px-4 flex flex-col bg-gray-800 shadow-lg shadow-green-500 rounded-lg">
                    <div>
                        {
                            coin.market_data ?
                                <>
                                    <div>
                                        <div>
                                            <h4>24 Hours Low</h4>
                                            {
                                                coin.market_data.low_24h ?
                                                    <p>{coin.market_data.low_24h.usd}</p>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div>
                                            <h4>24 Hour High</h4>
                                            {
                                                coin.market_data.high_24h ?
                                                    <p>{coin.market_data.high_24h.usd}</p>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <h4>Market Cap</h4>
                                            {
                                                coin.market_data.market_cap ?
                                                    <p>{coin.market_data.market_cap.usd}</p>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div>
                                            <h4>Circulating supply</h4>
                                            <p>{coin.market_data.circulating_supply}</p>
                                        </div>
                                    </div>
                                </>
                                :
                                null
                        }
                    </div>
                </div>

                <div className="max-w-3xl my-4 mx-auto py-3 px-4 flex flex-col bg-gray-800 shadow-lg shadow-green-500 rounded-lg">
                    <div>
                        <h3>About</h3>
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