import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Coinitem from "./Coinitem";
import Coin from "./Coin";
import LoaderComponent from "./LoaderComponent";

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedPagination, setSelectedPagination] = useState(1);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 10;

    useEffect(() => {
        setLoading(true);
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}&page=${selectedPagination}&sparkline=false&locale=en`;

        axios
            .get(url)
            .then((response) => {
                setCoins(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(true);
            });
    }, [selectedPagination]);

    useEffect(() => {
        setFilteredCoins(coins);
    }, [coins]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredResults = coins.filter(
            (coin) => coin.symbol.toLowerCase().includes(searchTerm) || coin.name.toLowerCase().includes(searchTerm)
        );
        setFilteredCoins(filteredResults);
        setSearch(searchTerm);
    };

    const changePaginationSet = (paginationSet) => {
        setSelectedPagination(paginationSet);
    };

    return (
        <div className="flex-grow bg-black">
            <div className="flex items-center justify-center mt-2">
                <FontAwesomeIcon icon={faCoins} className="text-green-500 text-3xl" />
                <h1 className="text-white">
                    Your <span className="text-green-500">Dashboard</span>
                </h1>
            </div>

            <div className="flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Search Coins..."
                    className="w-7xl p-2 m-4 rounded-md text-white bg-transparent"
                    value={search}
                    onChange={handleSearch}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-green-500 text-3xl" />
            </div>

            <div className="max-w-7xl m-auto text-white">
                <LoaderComponent loading={loading} />

                <div>
                    <div className="flex justify-between items-center bg-gray-800 shadow-lg shadow-green-500 rounded-lg m-8 p-4 font-bold">
                        <p>#</p>
                        <p className="ml-[-4rem]">Coins</p>
                        <p>Price</p>
                        <p>24h</p>
                        <p className="hidden md:block">Volume</p>
                        <p className="hidden md:block">Market Cap</p>
                        <p className="hidden md:block">Actions</p>
                    </div>

                    {filteredCoins.map((coin) => (
                        <Link to={`/coin/${coin.id}`} element={<Coin />} key={coin.id}>
                            <Coinitem coins={coin} />
                        </Link>
                    ))}

                    <div className="flex justify-center items-center">
                        {Array.from({ length: filteredCoins.length }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => changePaginationSet(index + 1)}
                                className={`mx-1 px-3 py-2 rounded-md ${
                                    selectedPagination === index + 1 ? "bg-gray-600" : "bg-gray-800"
                                } text-white hover:bg-gray-600`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
