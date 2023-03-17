import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import TopRated from './pages/TopRated';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Movie from './pages/Movie';
import Home from './pages/Home';
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route element={<App/>}>
            <Route path='/' element={<Home />} />
            <Route path='movie/:id' element={<Movie />} />
            <Route path='search' element={<Search />} />
            <Route path='toprated/:page' element={<TopRated />} />
            <Route path='popular/:page' element={<Popular />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
