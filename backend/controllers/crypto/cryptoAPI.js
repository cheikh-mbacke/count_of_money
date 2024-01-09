const axios = require('axios');

const getExchangeRates = async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=eur');
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getCryptoList = async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'eur',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: false
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération de la liste des crypto-monnaies"});
    }
};

const getCryptoDetails = async (req, res) => {
    const cryptoId = req.params.id;

    console.log(cryptoId);

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la récupération des détails de la crypto-monnaie', error: error});
    }
};

const getCryptoHistory = async (req, res) => {
    const cryptoId = req.params.id;
    const { period } = req.query; // Récupère la période depuis les paramètres de requête

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`, {
            params: {
                vs_currency: 'eur', // ou autre devise
                days: period // '1', '7', '30', etc., en fonction de la période demandée
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send({message: "Erreur lors de la récupération de l'historique des prix"});
    }
};

const addCrypto = async (req, res) => {
    // Logique pour ajouter une crypto-monnaie
    // Utilisez les informations envoyées dans req.body pour ajouter une nouvelle crypto-monnaie
};

const deleteCrypto = async (req, res) => {
    const cryptoId = req.params.id;
    // Logique pour supprimer une crypto-monnaie
    // Utilisez cryptoId pour identifier et supprimer la crypto-monnaie
};



module.exports = { getCryptoList, getExchangeRates, getCryptoDetails, getCryptoHistory, addCrypto, deleteCrypto };
