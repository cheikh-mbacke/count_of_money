const db = require("../../models");
const User = db.User;

const axios = require('axios');

const NEWS_API_KEY = 'ed19741278c94d5abca36ca5f44a123a';

const getArticles = async (req, res) => {
    try {
        // Récupérer l'utilisateur connecté (ou un profil anonyme)
        const userId = req.body.userId;
        const userKeywords = userId ? await getUserKeywords(userId) : '';

        // Construire la chaîne de recherche avec les mots-clés de l'utilisateur
        const searchQuery = userKeywords ? `cryptocurrency ${userKeywords}` : 'cryptocurrency';

        // Paramètres pour NewsAPI
        const params = {
            q: searchQuery,
            apiKey: NEWS_API_KEY
        };

        const response = await axios.get('https://newsapi.org/v2/everything', { params });

        // Vérifiez la réponse et extrayez les articles
        if (response.data && response.data.articles) {
            const articles = response.data.articles;
            res.status(200).json(articles);
        } else {
            res.status(404).json({ message: "Aucun article trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des articles", error: error.message });
    }
};

// Fonction pour récupérer les mots-clés de l'utilisateur
async function getUserKeywords(userId) {
    // Récupérer l'utilisateur et ses mots-clés depuis la base de données
    const user = await User.findByPk(userId);
    return user ? user.pressReviewKeywords : '';
}


module.exports = { 
    getArticles
};

