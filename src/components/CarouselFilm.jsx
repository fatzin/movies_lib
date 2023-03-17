import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './CarouselFilm.css';
const imageUrl = import.meta.env.VITE_CAROUSEL_IMG;

const CarouselFilm = ({movie, showLink = true}) => {
  return ( <div className='CarouselFilm'>
    {showLink && 
        <Link to={`/movie/${movie.id}`}>
        <div className='card'>
        <img className='film--image' src={imageUrl+movie.poster_path} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p className='movie--star'>
            <FaStar /> {movie.vote_average}
        </p>
        </div>
    </Link>}
    </div>
  )
}

export default CarouselFilm