import React from 'react';

const Article = ({ article }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="font-bold text-xl text-green-400 mb-2">{article.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition-colors duration-300">Read More</a>
            </div>
        </div>
    );
};




export default Article;
