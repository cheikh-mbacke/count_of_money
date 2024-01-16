import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from 'axios';
import userService from "../Actions/User";
import NonConnect from "./NonConnect";

const Profile = () => {
    const us = useSelector((state) => state.auth.user);
    const [user, setUser] = useState(null)
    const [cryptoPrices, setCryptoPrices] = useState({});
    const [totalCryptoValueInEuros, setTotalCryptoValueInEuros] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState({
        pseudo: "",
        email: "",
    });

    const conversionRateUSDToEUR = 0.9;

    const fetchDataUser = async () => {
        if (us) {
            try{
                const response = await userService.getUserProfile()
                setUser(response)
                setEditProfile({
                    pseudo: response.pseudo,
                    email: response.email,
                });
            } catch (error) {
                console.error("Erreur lors de la récupération du profil de l'utilisateur", error);
            }
        }
    }

    const getCryptoPrices = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
            const prices = {};
            let totalValueUSD = 0;
            response.data.forEach(coin => {
                prices[coin.id] = Math.round(coin.current_price);
            });
            setCryptoPrices(prices);

            userWallet.forEach(crypto => {
                totalValueUSD += (crypto.amount * (prices[crypto.name] || 0));
            });

            setTotalCryptoValueInEuros(Math.round(totalValueUSD * conversionRateUSDToEUR));
        } catch (error) {
            console.error("Erreur lors de la récupération des prix des cryptomonnaies", error);
        }
    };

    useEffect(() => {
        fetchDataUser()
        getCryptoPrices();
    }, [us]);


    const handleEditChange = (e) => {
        setEditProfile({...editProfile, [e.target.name]: e.target.value});
    };

    const submitEditProfile = async () => {
        try {
            const payload = {
                userId: user.id,
                ...editProfile
            }
            await userService.updateUserProfile(payload)
            setIsEditing(false);
            fetchDataUser()
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil :', error);
        }
    };


    const userWallet = [
        {name: "bitcoin", amount: "0.5"},
        {name: "ethereum", amount: "2.3"},
        {name: "cardano", amount: "56"},
        {name: "ripple", amount: "22"},
        {name: "tether", amount: "100"},
    ];

    return (
        <div className="flex-grow bg-black text-white p-4">
            {user ? (
                <>
                    <div>
                        <div className="flex items-center bg-[#121212] rounded-3xl p-5 shadow-neon mb-8">
                            <div className="flex flex-col w-1/2">
                                <p className="text-[#ccc] mb-2">ID Utilisateur: {user.userId}</p>
                                <p className="text-[#ccc] mb-2">Pseudo: {user.pseudo}</p>
                                <p className="text-[#ccc] mb-2">Email: {user.email}</p>
                                <p className="text-[#ccc] mb-2">Soldes: 30458€</p>
                                <p className="text-[#ccc] mb-2">Soldes crypto : {totalCryptoValueInEuros}€</p>
                            </div>
                            {isEditing ? (
                                <div className="flex flex-col space-y-2">
                                    <label>
                                        pseudo :
                                        <input
                                            className="text-black "
                                            type="text"
                                            name="pseudo"
                                            value={editProfile.pseudo}
                                            onChange={handleEditChange}
                                        />
                                    </label>
                                    <label>
                                        email:
                                        <input
                                            className="text-black ml-5"
                                            type="email"
                                            name="email"
                                            value={editProfile.email}
                                            onChange={handleEditChange}
                                        />
                                    </label>

                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                        onClick={submitEditProfile}>
                                        Valider
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => setIsEditing(false)}>
                                        Annuler
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col">
                                    Voulez-vous modifer le pseudo et l'email ?
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => setIsEditing(true)}>
                                        Modifier
                                    </button>
                                </label>

                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h3 className="mb-4 text-2xl font-bold text-neon">Portefeuille Crypto</h3>
                        <table className="mt-4 rounded-3xl overflow-hidden border-3 border-neon shadow-neon mx-auto">
                            <thead className="bg-green-700">
                            <tr>
                                <th className="px-4 py-2">Crypto</th>
                                <th className="px-4 py-2">Quantité</th>
                                <th className="px-4 py-2">Valeur Actuelle (USD)</th>
                            </tr>
                            </thead>
                            <tbody className="bg-black text-white">
                            {userWallet.map((crypto, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2">{crypto.name.charAt(0).toUpperCase() + crypto.name.slice(1)}</td>
                                    <td className="px-4 py-2">{crypto.amount}</td>
                                    <td className="px-4 py-2">${crypto.amount * (cryptoPrices[crypto.name] || 0)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <NonConnect/>
            )}
        </div>
    );
};

export default Profile;
