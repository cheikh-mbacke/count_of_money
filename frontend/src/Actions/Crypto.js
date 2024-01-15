import axios from 'axios';
import Cookies from "js-cookie";

const API_URL = 'http://localhost:3000';  // Remplacez par l'URL de votre backend

const cryptoService = {
    getAdminCryptoList: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/cryptos/admin`,{
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de la liste des cryptos pour l\'admin :', error);
            throw error;
        }
    },
    getCryptoList: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/cryptos`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de la liste des cryptos :', error);
            throw error;
        }
    },

    getCryptoDetails: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/api/cryptos/${id}`,{
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la crypto :', error);
            throw error;
        }
    },

    getCryptoHistory: async (id, period) => {//periode soit daily, hourly
        try {
            const response = await axios.get(`${API_URL}/api/cryptos/${id}/history/${period}`,{
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'historique des prix :', error);
            throw error;
        }
    },

    addCrypto: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/api/cryptos`, data,{
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la crypto-monnaie :', error);
            throw error;
        }
    },

    deleteCrypto: async (id, data) => {
        try {
            const response = await axios.delete(`${API_URL}/api/cryptos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la suppression de la crypto-monnaie :', error);
            throw error;
        }
    },
};

export default cryptoService;
