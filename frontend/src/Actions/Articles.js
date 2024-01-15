import axios from 'axios';

const API_URL = 'http://localhost:3000';  // Remplacez par l'URL de votre backend

const newsService = {
    getArticles: async (data) => {
        try {
            const response = await axios.get(`${API_URL}/api/articles`, data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des articles :', error);
            throw error;
        }
    },
};

export default newsService;
