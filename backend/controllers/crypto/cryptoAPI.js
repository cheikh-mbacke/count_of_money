const db = require("../../models");
const CryptoSelection = db.CryptoSelection;
const axios = require('axios');

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const getCryptoList = async (req, res) => {
    const key = 'cryptoList';
    const cachedData = myCache.get(key);

    if (cachedData) {
        return res.status(200).json(cachedData);
    }

    try {
        // Récupérer les identifiants des crypto-monnaies depuis la base de données
        const selectedCryptos = await CryptoSelection.findAll({
            attributes: ['cryptoId']
        });
        const ids = selectedCryptos.map(c => c.cryptoId).join(',');

        // Vérifier si des identifiants sont présents
        if (ids.length === 0) {
            return res.status(200).json({ message: "Aucune crypto-monnaie sélectionnée" });
        }

        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'eur',
                ids: ids,
                order: 'market_cap_desc',
                per_page: ids.split(',').length,
                page: 1,
                sparkline: false
            }
        });

        myCache.set(key, response.data, 3600); // Mise en cache pour 1 heure
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération de la liste des crypto-monnaies"});
    }
};


const getCryptoDetails = async (req, res) => {
    // Utiliser req.params.cmid au lieu de req.params.id
    const cryptoId = req.params.id;

    // Vérifier si cryptoId est fourni
    if (!cryptoId) {
        return res.status(400).json({ message: 'Identifiant de crypto-monnaie manquant' });
    }

    const key = `cryptoDetails-${cryptoId}`;
    const cachedData = myCache.get(key);

    if (cachedData) {
        return res.status(200).json(cachedData);
    }

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
        myCache.set(key, response.data, 3600); // Mise en cache pour 1 heure
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des détails de la crypto-monnaie' });
    }
};


const getCryptoHistory = async (req, res) => {
    const cryptoId = req.params.id;
    const period = req.params.period;
    const key = `cryptoHistory-${cryptoId}-${period}`;
    const cachedData = myCache.get(key);

    if (cachedData) {
        return res.status(200).json(cachedData);
    }

    try {
        let params = {
            vs_currency: 'eur',
            days: '1' // Valeur par défaut pour la période maximale
        };

        // Ajustement des jours en fonction de la période
        if (period === 'daily') {
            params.days = '60'; // Les 60 derniers jours
        } else if (period === 'hourly') {
            params.days = '2'; // Les 48 dernières heures
        } else {
            throw new Error('Période non prise en charge');
        }

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`, { params });
        myCache.set(key, response.data, 86400); // Mise en cache pour 1 jour
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send({message: error.message || "Erreur lors de la récupération de l'historique des prix"});
    }
};



const addCrypto = async (req, res) => {
    // Extraire les informations de la requête
    const { cryptoId, nom } = req.body;

    // Vérifier si les données nécessaires sont présentes
    if (!cryptoId || !nom) {
        return res.status(400).json({ message: "Les informations 'cryptoId' et 'nom' sont requises" });
    }

    try {
        // Vérifier si la crypto-monnaie existe déjà dans la base de données
        const existingCrypto = await CryptoSelection.findOne({ where: { cryptoId: cryptoId } });
        if (existingCrypto) {
            return res.status(409).json({ message: "Cette crypto-monnaie existe déjà" });
        }

        // Ajouter la nouvelle crypto-monnaie à la base de données
        const newCrypto = await CryptoSelection.create({ cryptoId, nom });

        // Retourner la réponse
        res.status(201).json({
            message: "Crypto-monnaie ajoutée avec succès",
            data: newCrypto
        });
    } catch (error) {
        // Gérer les erreurs éventuelles
        res.status(500).json({ message: "Erreur lors de l'ajout de la crypto-monnaie"});
    }
};


const deleteCrypto = async (req, res) => {
    const cryptoId = req.params.id;

    try {
        // Rechercher la crypto-monnaie dans la base de données
        const crypto = await CryptoSelection.findOne({ where: { cryptoId: cryptoId } });
        
        // Vérifier si la crypto-monnaie existe
        if (!crypto) {
            return res.status(404).json({ message: "Crypto-monnaie non trouvée" });
        }

        // Supprimer la crypto-monnaie de la base de données
        await CryptoSelection.destroy({ where: { cryptoId: cryptoId } });

        // Retourner la réponse
        res.status(200).json({ message: "Crypto-monnaie supprimée avec succès" });
    } catch (error) {
        // Gérer les erreurs éventuelles
        res.status(500).json({ message: "Erreur lors de la suppression de la crypto-monnaie" });
    }
};

module.exports = { 
    getCryptoList, 
    getCryptoDetails,
    getCryptoHistory,
    addCrypto,
    deleteCrypto
};
