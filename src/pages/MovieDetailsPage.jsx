import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import styles from './MovieDetailsPage.module.css'; 

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();

    useEffect(() => {
        async function fetchMovieDetails() {
            const url = `https://api.themoviedb.org/3/movie/${movieId}`;
            const options = {
                headers: {
                    Authorization: 'Bearer your_access_token_here'
                }
            };
            try {
                const response = await axios.get(url, options);
                setMovie(response.data);
            } catch (err) {
                console.error('Error fetching data:', err)
            }
        }
        fetchMovieDetails();
    }, [movieId]);

    return (
        <div className={styles.movieDetails}>
            <NavLink to={location.state} className={styles.goBack}>Go back</NavLink>
            {movie && (
                <>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p className={styles.genres}>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <ul className={styles.another}>
                        <li><NavLink to='cast' className={styles.link}>Cast</NavLink></li>
                        <li><NavLink to='reviews' className={styles.link}>Reviews</NavLink></li>
                    </ul>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </>
            )}
        </div>
    );
}