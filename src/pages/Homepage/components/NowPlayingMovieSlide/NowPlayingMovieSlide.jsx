import React from 'react'
import { useNowPlayingMoviesQuery } from '../../../../hooks/useNowPlayingMovies'
import { Alert } from 'react-bootstrap'
import 'react-multi-carousel/lib/styles.css';
import "./NowPlayingMovieSlide.style.css"
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


const NowPlayingMovieSlide = () => {

    const {data, isLoading, isError, error} = useNowPlayingMoviesQuery()

    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <Alert varient="danger">{error.message}</Alert>
    }
  return (
    <div>
        <MovieSlider 
          title='Now Playing Movies'
          movies={data.results}
          responsive={responsive}
        />
    </div>
  )
}

export default NowPlayingMovieSlide