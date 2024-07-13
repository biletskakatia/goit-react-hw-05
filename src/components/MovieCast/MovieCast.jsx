import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    useEffect(() => {
        async function fetchMovieCast() {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
            const options = {
                headers: {

                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODE0Mjg3OTE3ZDIwMzcxN2FhZGU3OTFiNGZiMDFiMyIsIm5iZiI6MTcyMDc3OTMyMC4zMDE0NDEsInN1YiI6IjY2OTBmZGY3Y2U1ZWVhNzQ2ZWNjOTU4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vCWLKXuAf91woDXQhLEeXLyLBdVr7o8UVYPCRs-y7j0'
                }
            };
            try {
                const response = await axios.get(url, options);
                setCast(response.data.cast);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        }
    fetchMovieCast()
    },[movieId])
    return (
        <div>
            <h2>Cast</h2>
            <ul>
                {cast.map(member => (
                    <li key={member.cast_id}>
                        {member.profile_path ? (
                            <img src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                            alt={member.name}/>
                        ) : (
                                <div></div>
                        )}
                        <div>
                            <p>{member.name}</p>
                            <p>Character: {member.character}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    
    );
}