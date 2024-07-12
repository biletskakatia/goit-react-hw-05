import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import css from './App.module.css'
const HomePage = lazy(() => import('../../pages/HomePage'));
const MoviesPage= lazy(()=> import('../../pages/MoviesPage')) ;
import Navigation from '../Navigation/Navigation';
const MovieDetalisPage = lazy(()=> import('../../pages/MovieDetailsPage')) ;
const MovieCast = lazy(()=> import('../MovieCast/MovieCast'));
const MovieReviews = lazy(()=> import('../MovieReviews/MovieReviews'));
const NotFoundPage = lazy(()=> import( '../../pages/NotFoundPage'));

export default function App() {
    return (
        <div className={css.container}>
        
            <Navigation />
            <Suspense fallback = {<div>Loading page...</div>}>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/:movieId" element={<MovieDetalisPage />}>
                    <Route path="cast" element={<MovieCast/>}/>
                    <Route path="reviews" element={<MovieReviews/> } />
                </Route >
                <Route path="*" element={<NotFoundPage/> } />
                </Routes>
            </Suspense>
        </div>
    );
}