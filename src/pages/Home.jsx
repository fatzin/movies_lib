import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import './MovieGrid.css';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselFilm from '../components/CarouselFilm';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const navigate = useNavigate();

    const handleTitleClick = (url) => {
        navigate(url);
    }

    const getTopRatesMovies = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setTopMovies(data.results);
    }

    const getPopularMovies = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setPopularMovies(data.results);
    }

    const getUpcomingMovies = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setUpcomingMovies(data.results);
    }

    useEffect(() => {
        const topRatedUrl = `${moviesURL}top_rated?${apiKey}&language=pt-BR`;
        const UpcomingURL = `${moviesURL}upcoming?${apiKey}&language=pt-BR`;
        const PopularURL = `${moviesURL}popular?${apiKey}&language=pt-BR`;
        getTopRatesMovies(topRatedUrl);
        getUpcomingMovies(UpcomingURL);
        getPopularMovies(PopularURL);
    }, []);

    return (
        <div className='container'>
            <h2 className='title' onMouseOver={e => e.target.innerText = 'Ver mais'} onMouseLeave={e => e.target.innerText = 'Melhores filmes:'} onClick={() => handleTitleClick('/toprated/1')}>Melhores filmes:</h2>
            {topMovies.length === 0 ? <p> Carregando...</p> : 
            <Carousel responsive={responsive} infinite={true}>
                {topMovies.length > 0 && topMovies.map((movie) => <CarouselFilm key={movie.id} movie={movie} />)}
            </Carousel> }
            <h2 className='title' onMouseOver={e => e.target.innerText = 'Ver mais'} onMouseLeave={e => e.target.innerText = 'Filmes mais populares (atualizado diariamente):'} onClick={() => handleTitleClick('/popular/1')}>Filmes mais populares (atualizado diariamente):</h2>
            {popularMovies.length === 0 ? <p> Carregando...</p> : 
            <Carousel responsive={responsive} infinite={true}>
                {popularMovies.length > 0 && popularMovies.map((movie) => <CarouselFilm key={movie.id} movie={movie} />)}
            </Carousel>
            }
            <h2 className='title1'>Em breve nos cinemas:</h2>
            {topMovies.length === 0 ? <p> Carregando...</p> : 
            <Carousel responsive={responsive} infinite={true}>
                {upcomingMovies.length > 0 && upcomingMovies.map((movie) => <CarouselFilm key={movie.id} movie={movie} />)}
            </Carousel>
            }
        </div>
    )
}

export default Home