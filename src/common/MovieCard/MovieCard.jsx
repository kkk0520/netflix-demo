import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import {useGenreListQuery} from '../../hooks/useMovieGenreIds'


const MovieCard = ({movie}) => {

    const { data : genreData} = useGenreListQuery()
    console.log("무비카드 장르 : ", genreData)

    const getGenreName = ((genreId) => {

        if (!genreData) return []
        const genre = genreData.find((item) => {
            return item.id === genreId
        })

        return genre.name;
    })

  return (
    <div
        style={{backgroundImage:"url("+`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`+")",
        }}
        className="movie-card"
    >
        <div className="overlay">
            <h1>{movie.title}</h1>
            {movie.genre_ids.map((id, index)=>(
                <Badge bg="danger" key={index}>{getGenreName(id)}</Badge>
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