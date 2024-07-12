import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function MovieReviews() {
    const { movieId } = useParams();
const [reviews, setReviews] = useState([]);

useEffect(() => {
    async function fetchMovieReviews() {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
    const options = {
        headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODE0Mjg3OTE3ZDIwMzcxN2FhZGU3OTFiNGZiMDFiMyIsIm5iZiI6MTcyMDc3OTMyMC4zMDE0NDEsInN1YiI6IjY2OTBmZGY3Y2U1ZWVhNzQ2ZWNjOTU4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vCWLKXuAf91woDXQhLEeXLyLBdVr7o8UVYPCRs-y7j0'
        }
    };

    try {
        const response = await axios.get(url, options);
        setReviews(response.data.results);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
    }

    fetchMovieReviews();
}, [movieId]);

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
        <p>We do not have any reviews for this movie.</p>
        ) : (
        <ul>
        {reviews.map(review => (
            <li key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
            </li>
        ))}
        </ul>
        )}
        </div>
        
    );
}