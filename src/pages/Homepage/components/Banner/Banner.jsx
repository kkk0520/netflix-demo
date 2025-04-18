import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'react-bootstrap';
import "./Banner.style.css"

// 인기 영화를 가져와야 한다.
// api 호출하는 훅을 만들어준다. 리액트 쿼리로 api 호출


const Banner = () => {

    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    console.log(data);
    if(isLoading){
        <h1>로딩중</h1>
    }
    if(isError){
        <Alert variant="danger">{error.message}</Alert>
    }
  return (
    <div style={
        {
            backgroundImage:"url("+
            `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path}`+
            ")",
        }}
        className="banner"
    >
        <div className="text-white banner-text-area">
            <h1>{data?.results[0].title}</h1>
            <p>{data?.results[0].overview}</p>
        </div>
    </div>
  )
}

export default Banner;