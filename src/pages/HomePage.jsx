import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from '../components/MovieList/MovieList';
export default function HomePage() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    
    useEffect(() => {
        async function fetchTrending() {
            const url = 'https://api.themoviedb.org/3/trending/movie/day';
            const options = {
                headers: {

                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODE0Mjg3OTE3ZDIwMzcxN2FhZGU3OTFiNGZiMDFiMyIsIm5iZiI6MTcyMDc3OTMyMC4zMDE0NDEsInN1YiI6IjY2OTBmZGY3Y2U1ZWVhNzQ2ZWNjOTU4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vCWLKXuAf91woDXQhLEeXLyLBdVr7o8UVYPCRs-y7j0'
                }
            };
            try {
                const response = await axios.get(url, options);
                setTrendingMovies(response.data.results);
            } catch (err) {
                console.error('Error fetching data:',err);
            }
        }
            fetchTrending();
        }, []
    )
    return (
        <div>
            <h2>Trending today</h2>
            {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
        </div>
        
    );
}