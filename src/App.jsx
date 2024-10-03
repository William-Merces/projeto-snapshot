import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import PhotoGrid from './components/PhotoGrid';

function App() {
  // Estado para armazenar as fotos carregadas da API
  const [photos, setPhotos] = useState([]);
  // Estado para controlar o indicador de carregamento
  const [loading, setLoading] = useState(false);

  // Função para buscar fotos da API Unsplash
  const searchPhotos = useCallback(async (term) => {
    setLoading(true);
    try {
      // Fazendo a requisição GET para a API do Unsplash
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: term,
          per_page: 20 
        },
        headers: {
          // Usando a chave de API armazenada nas variáveis de ambiente
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
        }
      });
      // Atualizando o estado com as fotos recebidas
      setPhotos(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
    }
    setLoading(false);
  }, []);

  return (
    <Router>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center my-8">Buscador de Fotos</h1>
        
        {/* Navegação com links para diferentes categorias */}
        <nav className="mb-8">
          <ul className="flex justify-center space-x-4">
            <li><Link to="/montanha" className="text-blue-500 hover:text-blue-700">Montanha</Link></li>
            <li><Link to="/praia" className="text-blue-500 hover:text-blue-700">Praia</Link></li>
            <li><Link to="/passaro" className="text-blue-500 hover:text-blue-700">Pássaro</Link></li>
            <li><Link to="/comida" className="text-blue-500 hover:text-blue-700">Comida</Link></li>
          </ul>
        </nav>

        {/* Definição das rotas */}
        <Routes>
          {/* Rota inicial */}
          <Route path="/" element={<h2 className="text-2xl text-center">Bem-vindo! Escolha uma categoria acima.</h2>} />
          {/* Rotas para cada categoria, usando o componente PhotoGrid */}
          <Route path="/montanha" element={<PhotoGrid term="montanha" searchPhotos={searchPhotos} />} />
          <Route path="/praia" element={<PhotoGrid term="praia" searchPhotos={searchPhotos} />} />
          <Route path="/passaro" element={<PhotoGrid term="passaro" searchPhotos={searchPhotos} />} />
          <Route path="/comida" element={<PhotoGrid term="comida" searchPhotos={searchPhotos} />} />
        </Routes>

        {/* Exibição condicional: Carregando ou grade de fotos */}
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Mapeamento das fotos para exibição */}
            {photos.map((photo) => (
              <img key={photo.id} src={photo.urls.small} alt={photo.alt_description} className="w-full h-48 object-cover rounded" />
            ))}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;