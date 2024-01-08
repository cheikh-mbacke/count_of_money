import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from 'axios';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const [cryptoPrices, setCryptoPrices] = useState({});
    const [totalCryptoValueInEuros, setTotalCryptoValueInEuros] = useState(0);

    // Le taux de conversion de USD à EUR pour cet exemple est fictif.
    // Dans une application réelle, vous voudriez obtenir ce taux via une API de taux de change.
    const conversionRateUSDToEUR = 0.9;

    useEffect(() => {
        const getCryptoPrices = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
                const prices = {};
                let totalValueUSD = 0;
                response.data.forEach(coin => {
                    prices[coin.id] = Math.round(coin.current_price);
                });
                setCryptoPrices(prices);

                // Calculer le total en USD
                userWallet.forEach(crypto => {
                    totalValueUSD += (crypto.amount * (prices[crypto.name] || 0));
                });

                // Convertir le total en EUR
                setTotalCryptoValueInEuros(Math.round(totalValueUSD * conversionRateUSDToEUR));
            } catch (error) {
                console.error("Erreur lors de la récupération des prix des cryptomonnaies", error);
            }
        };

        getCryptoPrices();
    }, []);

    // Ici, vous pourriez avoir une liste de crypto-monnaies que l'utilisateur détient
    const userWallet = [
        {name: "bitcoin", amount: "0.5"},
        {name: "ethereum", amount: "2.3"},
        {name: "cardano", amount: "56"},
        {name: "ripple", amount: "22"},
        {name: "usdt", amount: "100"},
    ];

    return (
        <>
            <style>
                {`
    .user-info {
        background-color: #333; /* Fond plus sombre pour les informations de l'utilisateur */
        padding: 1rem; /* Espacement interne */
        border-radius: 0.5rem; /* Bords arrondis */
        margin-bottom: 2rem; /* Espacement avec les éléments suivants */
    }
    .user-info p {
        color: #ccc; /* Couleur de texte plus claire pour les informations de l'utilisateur */
        margin-bottom: 0.5rem; /* Espacement entre les lignes */
    }
    .crypto-wallet table {
        background-color: black; /* Fond en noir */
        color: white; /* Texte en blanc */
        width: 100%;
        margin-top: 1rem;
        border-collapse: collapse;
    }
    .crypto-wallet thead tr {
        background-color: #16a34a;
    }
    .crypto-wallet tbody tr {
        background-color: black; /* Fond des lignes en noir */
    }
    .crypto-wallet tbody tr td {
        color: white; /* Texte des lignes en blanc */
    }
    .crypto-wallet th, .crypto-wallet td {
        border: 1px solid #ddd;
        text-align: left;
        padding: 8px;
    }
    `}
            </style>

            <div className="flex-grow bg-black text-white p-4">
                {
                    user ?
                        <>
                            <div className="user-info mb-4">
                                <p>ID Utilisateur: {user.userId}</p>
                                <p>Pseudo: {user.pseudo}</p>
                                <p>Email: {user.email}</p>
                                <p>Soldes: 30458€</p>
                                <p>Soldes crypto : {totalCryptoValueInEuros}€</p>
                            </div>
                            <div className="crypto-wallet">
                                <h3 className="mb-2">Portefeuille Crypto</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Crypto</th>
                                        <th>Quantité</th>
                                        <th>Valeur Actuelle (USD)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userWallet.map((crypto, index) => (
                                        <tr key={index}>
                                            <td>{crypto.name.charAt(0).toUpperCase() + crypto.name.slice(1)}</td>
                                            <td>{crypto.amount}</td>
                                            <td>${crypto.amount * (cryptoPrices[crypto.name] || 0)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                        :
                        <p>Aucun utilisateur connecté</p>
                }
            </div>
        </>
    );
};

export default Profile;
