import React from 'react'
import { useNowPlayingMoviesQuery } from '../../../../../hooks/useNowPlayingMovies'
import { Alert } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../../MovieCard/MovieCard';
import "./NowPlayingMovieSlide.style.css"

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

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
        <h3 className="movie-slide-category">Now Playing Movies</h3>
        <Carousel
            infinite={true}
            centerMode={true}
            itemClass="movie-slider p-1"
            containerClass='carousel-container'
            responsive={responsive}
            >
            {data.results.map((movie, index)=>
                <MovieCard movie={movie} key={index} ></MovieCard>)}
        </Carousel>
    </div>
  )
}

export default NowPlayingMovieSlide