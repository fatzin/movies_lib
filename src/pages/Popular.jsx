import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import './Pagination.css';

import { GrNext, GrPrevious } from 'react-icons/gr';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const getPopularMovies= async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results);
}


   useEffect(() => {
    const PopularURL = `${moviesURL}popular?${apiKey}&language=pt-BR&page=${page}`;
    getPopularMovies(PopularURL);
  }, [apiKey, page]);

  return (
    <div className='container'>
      <h2 className='title1'>Filmes populares (atualizados diariamente):</h2>
            <div className="movies-container">
                {movies.length === 0 && <p> Carregando...</p>}
                {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className='pagination-buttons'><GrPrevious/></button>
            <span>{page}</span>
        <button disabled={movies.length < 20} onClick={() => setPage(page + 1)} className='pagination-buttons'><GrNext/></button>
      </div>
    </div>
  );
}

export default Popular;