import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
            navigate(`/search/${searchTerm}`);
            setSearchTerm('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-center justify-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pesquisar imagens..."
                    className="px-4 py-2 w-64 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Pesquisar
                </button>
            </div>
        </form>
    );
}

export default SearchBar;