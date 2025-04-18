import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'

// 인기 영화를 가져와야 한다.
// api 호출하는 훅을 만들어준다. 리액트 쿼리로 api 호출


const Banner = () => {

    const {data} = usePopularMoviesQuery()
    console.log(data);
  return (
    <div>Banner</div>
  )
}

export default Banner