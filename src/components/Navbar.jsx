import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';

import './Navbar.css';

const Navbar = () => {
    const[search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!search) return;
        navigate(`/search?q=${search}`);
        setSearch("");
    }

    const handleClick= () => {
        navigate(`/`);
    }


    return (
        <nav id="navbar">
            <h2> <Link to="/"> <BiCameraMovie /> MoviesAPP </Link></h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                 placeholder='Busque um filme'
                 onChange={(e) => setSearch(e.target.value)}
                 value={search} />
                <button type='submit' className='search-button'><BiSearchAlt2 /></button>
                <button className='home-screen' onClick={() => handleClick()}><FaHome/></button>
            </form>
        </nav>
    )
}

export default Navbar