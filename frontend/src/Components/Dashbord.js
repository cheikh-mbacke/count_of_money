import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Coinitem from "./Coinitem";
import LoaderComponent from "./LoaderComponent";
import cryptoService from "../Actions/Crypto";
import {useSelector} from "react-redux";


const Dashboard = () => {
        const user = useSelector((state) => state.auth.user);
        const [coins, setCoins] = useState([]);
        const [filteredCoins, setFilteredCoins] = useState([]);
        const [search, setSearch] = useState("");
        const [loading, setLoading] = useState(false);
        const [activeTab, setActiveTab] = useState('cryptos');
        const itemsPerPage = 100;

        useEffect(() => {
            let response
            const fetchData = async () => {
                setLoading(true);
                try {
                    if (user && user.roleName === "admin") {
                        console.log("admin")
                        switch (activeTab) {
                            case "cryptos":
                                console.log("cryptos")
                                response = await cryptoService.getAdminCryptoList()
                                console.log(response)
                                //const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}&page=1&sparkline=false&locale=en`;
                                //response = await axios.get(url);
                                setCoins(response);
                                setLoading(false);
                                break;
                            case "add":
                                console.log("add")
                                response = await cryptoService.getCryptoList();
                                if (response.message)
                                    setLoading(true);
                                else {
                                    setCoins(response);
                                    setLoading(false);
                                }
                                break;
                        }
                    } else if (user && user.roleName === "user") {
                        console.log("user")

                        switch (activeTab) {
                            case "cryptos":
                                console.log("cryptos")
                                response = await cryptoService.getCryptoList();
                                if (response.message)
                                    setLoading(true);
                                else {
                                    setCoins(response);
                                    setLoading(false);
                                }
                                break;
                            case "favorites":
                                console.log("favorites")
                                response = await cryptoService.getCryptoList();
                                if (response.message)
                                    setLoading(true);
                                else {
                                    setCoins(response);
                                    setLoading(false);
                                }
                                break;
                        }
                    } else {
                        console.log("invite")
                        response = await cryptoService.getCryptoList();
                        if (response.message)
                            setLoading(true);
                        else {
                            setCoins(response);
                            setLoading(false);
                        }
                    }
                } catch
                    (error) {
                    console.log(error);
                    setLoading(true);
                }
            };
            fetchData();

        }, [user, activeTab]);


        useEffect(() => {
            const filterCoins = () => {
                const searchTerm = search.toLowerCase();
                return coins.filter(
                    (coin) => coin.symbol.toLowerCase().includes(searchTerm) || coin.name.toLowerCase().includes(searchTerm)
                );
            };
            setFilteredCoins(filterCoins);
        }, [coins, search]);

        const handleSearch = (event) => {
            setSearch(event.target.value);
        };

        const renderTabs = () => {
            const isUserAdmin = user && user.roleName === "admin";
            const isUserLoggedIn = user && user.roleName === "user";

            return (
                <div className="flex justify-center space-x-4 my-4">


                    {isUserAdmin ?
                        <>
                            <button
                                className={`px-4 py-2 ${activeTab === 'cryptos' ? 'bg-green-500' : 'bg-gray-300'}`}
                                onClick={() => setActiveTab('cryptos')}>
                                Cryptos
                            </button>
                            <button
                                className={`px-4 py-2 ${activeTab === 'add' ? 'bg-green-500' : 'bg-gray-300'}`}
                                onClick={() => setActiveTab('add')}>
                                Add
                            </button>
                        </>
                        :
                        null
                    }

                    {isUserLoggedIn ?
                        <>
                            <button
                                className={`px-4 py-2 ${activeTab === 'cryptos' ? 'bg-green-500' : 'bg-gray-300'}`}
                                onClick={() => setActiveTab('cryptos')}>
                                Cryptos
                            </button>
                            <button
                                className={`px-4 py-2 ${activeTab === 'favorites' ? 'bg-green-500' : 'bg-gray-300'}`}
                                onClick={() => setActiveTab('favorites')}>
                                Favorites
                            </button>
                        </>
                        :
                        null
                    }
                </div>
            );
        };


        return (
            <div className="flex-grow bg-black">
                <div className="flex items-center justify-center mt-2">
                    <FontAwesomeIcon icon={faCoins} className="text-green-500 text-3xl"/>
                    <h1 className="text-white">
                        Your <span className="text-green-500">Market</span>
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
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-green-500 text-3xl"/>
                </div>

                {renderTabs()}

                <div className="max-w-7xl m-auto text-white">
                    <LoaderComponent loading={loading}/>

                    <div>
                        <div
                            className="flex justify-between items-center bg-gray-800 shadow-lg shadow-green-500 rounded-lg m-8 p-4 font-bold">
                            <p>FAV</p>
                            <p className="ml-[-4rem]">Coins</p>
                            <p>Price</p>
                            <p className="hidden md:block">24h</p>
                            <p className="hidden md:block">Volume</p>
                            <p className="hidden md:block">Market Cap</p>
                            <p>Actions</p>
                        </div>

                        {filteredCoins.map((coin) => (
                            <div>
                                <Coinitem coins={coin}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
;

export default Dashboard;
