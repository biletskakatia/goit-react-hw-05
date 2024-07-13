import axios from 'axios';
import { useState, useEffect } from 'react';
import {useSearchParams } from 'react-router-dom';
import MovieFilter from '../components/MovieFilter/MovieFilter';
import MovieList from '../components/MovieList/MovieList';

export default function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [query, setQuery] = useState(searchParams.get('query') ?? '');

    useEffect(() => {
    const fetchMovies = async (query) => {
        const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`;
        const options = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODE0Mjg3OTE3ZDIwMzcxN2FhZGU3OTFiNGZiMDFiMyIsIm5iZiI6MTcyMDc3OTMyMC4zMDE0NDEsInN1YiI6IjY2OTBmZGY3Y2U1ZWVhNzQ2ZWNjOTU4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vCWLKXuAf91woDXQhLEeXLyLBdVr7o8UVYPCRs-y7j0'
            }
        };
        try {
        const response = await axios.get(url, options);
            if (response.data.results.length > 0) {
                setMovies(response.data.results);
                setErrorMessage('');
            } else {
                setMovies([]);
                setErrorMessage('No movies found for your search query.');
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setErrorMessage('An error occurred while fetching data.');
        }
        };
    const initialQuery = searchParams.get('query');
        if (initialQuery) {
            fetchMovies(initialQuery);
        }

    }, [searchParams]);


    const changeOwnerFilter = (newQuery) => {
        setQuery(newQuery);
        setSearchParams({ query: newQuery });
    };

    return (
        <div>
            <MovieFilter
                value={query}
                onFilter={changeOwnerFilter}
            />
            {errorMessage && <p>{errorMessage}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}