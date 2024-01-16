import React, {useEffect, useState} from "react";
import userService from "../Actions/User";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import NonConnect from "./NonConnect";
import Home from "./Home";

const Welcome = () => {
    const us = useSelector((state) => state.auth.user);
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const [selectedCryptos, setSelectedCryptos] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    useEffect(() => {
        const fetchDataUser = async () => {
            if (us) {
                try {
                    const response = await userService.getUserProfile()
                    setUser(response)
                } catch (error) {
                    console.error("Erreur lors de la récupération du profil de l'utilisateur", error);
                }
            }
        }
        fetchDataUser()
    }, [us]);


    const handleCryptoChange = (event) => {
        setSelectedCryptos(event.target.value);
    };

    const handleKeywordChange = (keyword) => {
        setSelectedKeywords(prevKeywords =>
            prevKeywords.includes(keyword)
                ? prevKeywords.filter(k => k !== keyword)
                : [...prevKeywords, keyword]
        );
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                userId: user.id,
                currency: selectedCryptos,
                pressReviewKeywords: selectedKeywords.join(',').toString()
            };

            await userService.updateUserProfile(payload);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
        }
    };

    const redirectToMarket = async () => {
        await handleSubmit()
        navigate('/market');
    };

    const redirectToHome = async () => {
        navigate('/market');
    };


    return (
        <div className="flex-grow bg-black text-white">
            {
                !user ?
                    <Home/>
                    :
                    user && user.currency && user.pressReviewKeywords ?
                        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-500 rounded shadow text-black">
                            <p className="text-xl font-semibold mb-4">Rebonjour parmi nous, {user.pseudo}</p>
                            <p className="mb-6">Veuillez cliquer sur le bouton pour pouvoir surfer dans notre
                                application.</p>
                            <button onClick={redirectToHome}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Bienvenue
                            </button>
                        </div>
                        :
                        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-500 rounded shadow">
                            <h1 className="text-2xl font-bold mb-6">Bienvenue ! Choisissez vos préférences</h1>
                            <div className="mb-4 text-black">
                                <label className="block text-sm font-medium mb-2">Choisissez votre devise :</label>
                                <select value={selectedCryptos} onChange={handleCryptoChange}
                                        className="w-full p-2 border border-gray-300 rounded">
                                    <option value="">Choisissez votre devise prefere ...</option>
                                    <option value="usd">USD</option>
                                    <option value="eur">EUR</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Choisissez vos mots-clés :</label>
                                <div className="flex flex-wrap">
                                    <label className="flex items-center mr-4 mb-2">
                                        <input
                                            type="checkbox"
                                            value="bitcoin"
                                            checked={selectedKeywords.includes("bitcoin")}
                                            onChange={() => handleKeywordChange("bitcoin")}
                                        />
                                        Bitcoin
                                    </label>
                                    <label className="flex items-center mr-4 mb-2">
                                        <input
                                            type="checkbox"
                                            value="blockchain"
                                            checked={selectedKeywords.includes("blockchain")}
                                            onChange={() => handleKeywordChange("blockchain")}
                                        />
                                        Blockchain
                                    </label>
                                    <label className="flex items-center mr-4 mb-2">
                                        <input
                                            type="checkbox"
                                            value="profite"
                                            checked={selectedKeywords.includes("profite")}
                                            onChange={() => handleKeywordChange("profite")}
                                        />
                                        profite
                                    </label>
                                    <label className="flex items-center mr-4 mb-2">
                                        <input
                                            type="checkbox"
                                            value="marketcap"
                                            checked={selectedKeywords.includes("marketcap")}
                                            onChange={() => handleKeywordChange("marketcap")}
                                        />
                                        marketcap
                                    </label>
                                    <label className="flex items-center mr-4 mb-2">
                                        <input
                                            type="checkbox"
                                            value="prices"
                                            checked={selectedKeywords.includes("prices")}
                                            onChange={() => handleKeywordChange("prices")}
                                        />
                                        prices
                                    </label>
                                </div>
                            </div>
                            <button onClick={redirectToMarket}>Valider</button>
                        </div>
            }
        </div>
    );
};

export default Welcome;
