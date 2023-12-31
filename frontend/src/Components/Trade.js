import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faChartLine, faChartSimple} from "@fortawesome/free-solid-svg-icons";
import CandlestickChart from "./CandlestickChart";
import LineChart from "./LineChart";
import LoaderComponent from "./LoaderComponent";
import axios from "axios";

const Trade = () => {
    const params = useParams();
    const [coin, setCoin] = useState({})
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState("usd");
    const [selectedChartType, setSelectedChartType] = useState("candlestick");
    const [selectedOhlcDays, setSelectedOhlcDays] = useState(14);
    const [selectedMarketDays, setSelectedMarketDays] = useState(30);
    const [selectedLineDataType, setSelectedLineDataType] = useState("prices");
    const [quantity, setQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let apiEndpoint;
                if (selectedChartType === "candlestick") {
                    apiEndpoint = `https://api.coingecko.com/api/v3/coins/${params.coinId}/ohlc?vs_currency=${selectedCurrency}&days=${selectedOhlcDays}`;
                } else {
                    apiEndpoint = `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=${selectedCurrency}&days=${selectedMarketDays}`;
                }

                const response = await axios.get(apiEndpoint);
                const data = await response.data;

                // Réinitialisez les données à chaque changement de type de graphique
                setChartData([]);

                if (selectedChartType === "candlestick") {
                    setChartData(data);
                } else {
                    // Choix de la propriété de données pour le graphique en ligne
                    if (selectedLineDataType === "prices") {
                        const formattedPrices = data.prices.map(priceData => ({
                            y: parseFloat(priceData[1]).toFixed(2),
                            x: priceData[0]
                        }));
                        setChartData(formattedPrices);
                    } else if (selectedLineDataType === "market_caps") {
                        const formattedMarketCaps = data.market_caps.map(marketCapData => ({
                            y: parseFloat(marketCapData[1]).toFixed(2),
                            x: marketCapData[0]
                        }));
                        setChartData(formattedMarketCaps);
                    } else if (selectedLineDataType === "total_volumes") {
                        const formattedTotalVolumes = data.total_volumes.map(totalVolumeData => ({
                            y: parseFloat(totalVolumeData[1]).toFixed(2),
                            x: totalVolumeData[0]
                        }));
                        setChartData(formattedTotalVolumes);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(true);
            }
        };

        axios.get(url)
            .then((response) => {
                setCoin(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        fetchData();
    }, [url, params.coinId, selectedCurrency, selectedChartType, selectedOhlcDays, selectedMarketDays, selectedLineDataType]);

    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    const handleChartTypeChange = (type) => {
        setSelectedChartType(type);
    };

    const handleOhlcDaysChange = (event) => {
        setSelectedOhlcDays(Number(event.target.value));
    };

    const handleMarketDaysChange = (event) => {
        setSelectedMarketDays(Number(event.target.value));
    };

    const handleLineDataTypeChange = (type) => {
        setSelectedLineDataType(type);
    };
    const handleQuantityChange = (event) => {
        const newQuantity = Number(event.target.value);
        setQuantity(newQuantity);

        // Mettez à jour le coût total lorsque la quantité change
        const currentPrice = coin.market_data?.current_price?.usd;
        const newTotalCost = newQuantity * currentPrice;
        setTotalCost(newTotalCost);
    };

    const handleBuySell = (action) => {
        // Mettez en œuvre la logique d'achat ou de vente ici, en utilisant l'état de la quantité
        // et d'autres informations nécessaires.

        // Exemple simple:
        if (action === 'buy') {
            console.log(`Achat de ${quantity} ${params.coinId} pour un coût total de ${totalCost} ${selectedCurrency}`);
        } else if (action === 'sell') {
            console.log(`Vente de ${quantity} ${params.coinId} pour un coût total de ${totalCost} ${selectedCurrency}`);
        }
    };

    return (
        <div className="flex-grow bg-black">
            <LoaderComponent loading={loading}/>

            <Link to="/dashbord" className="m-5 text-green-300">
                <FontAwesomeIcon icon={faArrowLeft}/>
            </Link>

            <div className="flex justify-center space-x-3 pb-8">
                {
                    coin.image ?
                        <img src={coin.image.small} alt=""/>
                        :
                        null
                }
                <h1 className="text-white text-2xl font-bold mb-4">{
                    coin.name ?
                        coin.id.toUpperCase()
                        :
                        null
                }
                </h1>
            </div>

            <div className="flex items-center justify-center space-x-4 m-4">
                <div className="grid md:flex items-center space-y-1 md:space-x-2 mr-4">
                    <div
                        className={`cursor-pointer mr-2 ${selectedChartType === "candlestick" ? "text-white" : "text-gray-500"}`}
                        onClick={() => handleChartTypeChange("candlestick")}
                    >
                        <FontAwesomeIcon icon={faChartSimple} size="2x"/>
                    </div>
                    <div
                        className={`cursor-pointer ${selectedChartType === "line" ? "text-white" : "text-gray-500"}`}
                        onClick={() => handleChartTypeChange("line")}
                    >
                        <FontAwesomeIcon icon={faChartLine} size="2x"/>
                    </div>
                </div>

                <div className="mr-4">
                    <label className="text-white">
                        Currency:
                        <select value={selectedCurrency} onChange={handleCurrencyChange} className="text-black">
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                        </select>
                    </label>
                </div>

                {selectedChartType === "candlestick" ? (
                    <div>
                        <label className="text-white mr-4">
                            Number of Days (ohlc):
                            <select value={selectedOhlcDays} onChange={handleOhlcDaysChange} className="text-black">
                                <option value={1}>1 Day</option>
                                <option value={7}>7 Days</option>
                                <option value={14}>14 Days</option>
                                <option value={30}>30 Days</option>
                                <option value={90}>90 Days</option>
                                <option value={180}>180 Days</option>
                                <option value={365}>365 Days</option>
                            </select>
                        </label>
                    </div>
                ) : (
                    <div className="grid space-y-1 md:flex items-center justify-between">
                        <label className="text-white mr-4">
                            Number of Days (market):
                            <input
                                className="text-black"
                                type="number"
                                style={{ width: "50px" }}
                                value={selectedMarketDays}
                                onChange={handleMarketDaysChange}
                            />
                        </label>

                        <div>
                            <label className="text-white mr-4">
                                Line Data Type:
                                <select value={selectedLineDataType}
                                        onChange={(e) => handleLineDataTypeChange(e.target.value)}
                                        className="text-black">
                                    <option value="prices">Prices</option>
                                    <option value="market_caps">Market Caps</option>
                                    <option value="total_volumes">Total Volumes</option>
                                </select>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto justify-center">
                {selectedChartType === "candlestick" ? (
                    <CandlestickChart data={chartData}/>
                ) : (
                    <LineChart data={chartData}/>
                )}
            </div>

            <div className="flex flex-col items-center justify-center">

                <div>
                    <p className="text-white mr-4">
                        Coût par unité :
                        {
                            coin.market_data?.current_price ?
                                coin.market_data.current_price.usd.toLocaleString()
                                :
                                null
                        } { selectedCurrency.toUpperCase()}

                    </p>
                </div>

                <div className="justify-between space-x-3 p-4">
                    <label className="text-white mr-4">
                        Quantité:
                        <input
                            className="text-black"
                            type="number"
                            style={{ width: "50px" }}
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </label>

                    <label className="text-white mr-4">
                        Coût total:
                        <span
                            className="text-white">{totalCost.toLocaleString()} {selectedCurrency.toUpperCase()}</span>
                    </label>
                </div>

                <div className="justify-between space-x-3">
                    <button onClick={() => handleBuySell('buy')} className="bg-green-500 text-white p-2 rounded">
                        Acheter
                    </button>
                    <button onClick={() => handleBuySell('sell')} className="bg-red-500 text-white p-2 rounded">
                        Vendre
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Trade;
