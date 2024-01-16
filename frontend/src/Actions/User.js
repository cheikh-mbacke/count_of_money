import axios from 'axios';
import Cookies from "js-cookie";

const API_URL = 'http://localhost:3000';  // Remplacez par l'URL de votre backend

const userService = {
    // Fonction pour récupérer tous les utilisateurs
    Login: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/api/users/login`, data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            throw error;
        }
    },

    Register: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/api/users/register`, data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            throw error;
        }
    },

    Logout: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/api/users/logout`, data, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            throw error;
        }
    },

    getUserProfile: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération du profil utilisateur :', error);
            throw error;
        }
    },

    updateUserProfile: async (data) => {
        try {
            const response = await axios.put(`${API_URL}/api/users/profile`, data, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            })
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil utilisateur :', error);
            throw error;
        }
    },

};

export default userService;
