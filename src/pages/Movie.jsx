import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
} from 'react-icons/bs';
import { MdMovie } from 'react-icons/md';
import MovieCard from '../components/MovieCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import './Movie.css';
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

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [related, setRelated] = useState(null);

    const getMovies = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
    }

    const getRelated = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results.length == 0) {
            setRelated(["Nenhum filme encontrado"]);
            console.log(related);
        }
        setRelated(data.results);
    }

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?${apiKey}&language=pt-BR`;
        const relatedURL = `${moviesURL}${id}/similar?${apiKey}&language=pt-BR`;
        getMovies(movieURL);
        getRelated(relatedURL);
    }, [id])

    return (
        <div className='movie-page'>
            {movie && (<>
                <div className="content-sep">
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">{movie.tagline}</p>
                    <div className="info">
                        <h3>
                            <MdMovie /> Gênero
                        </h3>
                        <p>{movie.genres.length > 1 ? movie.genres[0].name + ", " + movie.genres[1].name : movie.genres[0].name}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsWallet2 /> Orçamento
                        </h3>
                        <p>{formatCurrency(movie.budget)}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsGraphUp /> Faturamento
                        </h3>
                        <p>{formatCurrency(movie.revenue)}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsHourglassSplit /> Duração
                        </h3>
                        <p>{movie.runtime} minutos</p>
                    </div>
                    <div className="info description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Descrição
                        </h3>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </>
            )}
            <div className="related-carousel">
            <h2>Filmes relacionados: </h2>
            {related === null || related.length === 0  ? <p className='not-found'> Nenhum filme encontrado</p> :
                <Carousel responsive={responsive} infinite={true}>
                    {related.length > 0 && related.map((movie) => <CarouselFilm key={movie.id} movie={movie} />)}
                </Carousel>
            }
            </div>
        </div>

    )
}

export default Movie