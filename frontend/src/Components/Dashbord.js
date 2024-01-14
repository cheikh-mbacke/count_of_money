import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
    const itemsPerPage = 100;

    useEffect(() => {
        const fetchData = async () => {
            console.log(user)
            setLoading(true);
            try {
                if (user && user.roleName === "admin") {
                    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}&page=1&sparkline=false&locale=en`;
                    const response = await axios.get(url);
                    setCoins(response.data);
                    setLoading(false);
                } else {
                    const response = await cryptoService.getCryptoList();
                    setCoins(response);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(true);
            }
        };
        if (user){
            fetchData();
        }
    }, [user]);



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
                            <Coinitem coins={coin} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
