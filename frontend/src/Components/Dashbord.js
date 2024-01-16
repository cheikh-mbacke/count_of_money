import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import Coinitem from "./Coinitem";
import LoaderComponent from "./LoaderComponent";
import cryptoService from "../Actions/Crypto";
import {useSelector} from "react-redux";
import userService from "../Actions/User";


const Dashboard = () => {
        const us = useSelector((state) => state.auth.user);
        const [user, setUser] = useState(null)
        const [coins, setCoins] = useState([]);
        const [filteredCoins, setFilteredCoins] = useState([]);
        const [search, setSearch] = useState("");
        const [loading, setLoading] = useState(false);
        const [activeTab, setActiveTab] = useState('cryptos');

        const refreshMarket = async () => {
            setLoading(true);
            try {
                if (user && user.roleName === "admin") {
                    switch (activeTab) {
                        case "cryptos":
                            console.log("admin cryptos ")
                            await getAdminCrypto()
                            break;
                        case "add":
                            console.log("admin add ")
                            await getFavCoins()
                            break;

                    }
                } else if (user && user.roleName === "user") {
                    switch (activeTab) {
                        case "cryptos":
                            console.log("user cryptos ")

                            await getFavCoins()
                            break;
                        case "favorites":
                            console.log("user favorites ")
                            await favCoinsUser()
                            break;

                    }
                } else {
                    console.log("invitees cryptos ")

                    await getFavCoins()
                }
            } catch
                (error) {
                console.log(error);
                setLoading(true);
            }
        };


        const getAdminCrypto = async () => {
            try {
                const response = await cryptoService.getAdminCryptoList()
                setCoins(response)
                setLoading(false)
            } catch (error) {
                console.log("Erreur lors de la recuperation des donnees admin", error)
                setLoading(true)
            }
        }

        const getFavCoins = async () => {
            try {
                const response = await cryptoService.getCryptoList();
                if (response.message) {
                    setLoading(true)
                } else {
                    setCoins(response)
                    setLoading(false)
                }
            } catch (error) {
                console.log("Erreur lors de la recuperation des cryptos fav admin", error)
                setLoading(true)
            }
        }
        const favCoinsUser = async () => {
            setLoading(true)
            try {
                const response = await cryptoService.getCryptoList();
                const us = await userService.getUserProfile()
                const prefCryptoUser = us.preferredCryptocurrencies

                if (!prefCryptoUser) {
                    setCoins([]);
                    setLoading(true);
                    return;
                }

                if (response && response.length > 0) {
                    const filteredFavorites = response.filter(crypto =>
                        prefCryptoUser.split(',').includes(crypto.id.toString())
                    );
                    if (filteredFavorites.length > 0) {
                        setCoins(filteredFavorites)
                        setLoading(false)
                    } else {
                        setLoading(true)
                    }
                } else {
                    setLoading(true)
                }
            } catch (error) {
                console.log("Erreur lors de la recuperation des cryptos fav user", error)
                setLoading(true)
            }
        }

        useEffect(() => {
            const fetchDataUser = async () => {
                if (us) {
                    try {
                        const response = await userService.getUserProfile();
                        console.log("ici c paris ", response.preferredCryptocurrencies)
                        setUser(response);
                    } catch (error) {
                        console.error("Erreur lors de la récupération du profil de l'utilisateur", error);
                    }
                } else {
                    setUser(null);
                }
            };

            fetchDataUser();
        }, [us]);


        useEffect(() => {
            refreshMarket();
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
                                Add aux favorites
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
                            className="flex justify-between items-center bg-gray-800 shadow-lg shadow-green-500 rounded-lg m-7 p-4 font-bold">
                            {
                                user ?
                                    <p>FAV</p>
                                    :
                                    null
                            }
                            <p>Coins</p>
                            <p>Price</p>
                            <p className="hidden md:block">24h</p>
                            <p className="hidden md:block">Volume</p>
                            <p className="hidden md:block">Market Cap</p>
                            <p>Actions</p>
                        </div>

                        {filteredCoins.map((coin) => (
                            <div>
                                <Coinitem coins={coin} activeTab={activeTab} onupdate={refreshMarket}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
;

export default Dashboard;
