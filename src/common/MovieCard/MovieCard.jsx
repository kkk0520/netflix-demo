import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import {useGenreListQuery} from '../../hooks/useMovieGenreIds'


const MovieCard = ({movie}) => {

    const { data : genreData} = useGenreListQuery()

    const showGenre = (genreIdList) => {

        if (!genreData || !genreIdList) return []
        const genreNameList = genreIdList.map((id) =>{
            const genreObj = genreData.find(genre=>genre.id === id)
            return genreObj.name;
        });

        return genreNameList;
    }

  return (
    <div
        style={{backgroundImage:"url("+`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`+")",
        }}
        className="movie-card"
    >
        <div className="overlay">
            <h1 className="movie-card-title">{movie.title}</h1>
            {showGenre(movie.genre_ids).map((genre, index)=>(
                <Badge bg="danger" key={index}>{genre}</Badge>
            ))}
       
            <div>
                <div>average : {movie.vote_average}</div>
                <div>popularity : {movie.popularity}</div>
                <div>{movie.adult ? "over18" : "under18"}</div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard