import React, {useEffect, useState} from "react";
import Article from "./Article";
import {useSelector} from "react-redux";
import newsService from "../Actions/Articles";

const ArticlesList = () => {
    const user = useSelector((state) => state.auth.user);
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const articlesPerPage = 9;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                if (user) {
                    const response = await newsService.getArticles(user.userId);
                    setArticles(response);
                    setTotalPages(Math.ceil(response.length / articlesPerPage));
                    setError("");
                } else {
                    const response = await newsService.getArticles();
                    setArticles(response);
                    setTotalPages(Math.ceil(response.length / articlesPerPage));
                    setError("");
                }

            } catch (error) {
                console.error("Erreur lors de la récupération des articles", error);
                setError("Erreur lors de la récupération des articles");
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, [user]);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex-grow bg-black text-white">
            <div className="flex justify-center mt-8">
                {Array.from({length: totalPages}, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`mx-2 px-3 py-1 rounded-full text-sm ${currentPage === pageNumber ? 'bg-green-500' : 'bg-gray-700'} hover:bg-green-600`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
            <div className="container mx-auto px-4 m-6">
                {loading && <p>Chargement...</p>}
                {error && <p>{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {!loading && !error && currentArticles.map(article => (
                        <Article key={article.id} article={article}/>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ArticlesList;
