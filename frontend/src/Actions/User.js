import axios from 'axios';

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

};

export default userService;
