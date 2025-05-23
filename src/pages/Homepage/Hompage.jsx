import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import NowPlayingMovieSlide from './components/NowPlayingMovieSlide/NowPlayingMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide'

// 1. 배너 => 인기 영화 첫번째 아이템 보여주기
// 2. 인기영화
// 3. 평점 좋은 영화
// 4. 상영예정 영화
const Hompage = () => {
  return (
    <div>
        <Banner />
        <PopularMovieSlide />        
        <NowPlayingMovieSlide />
        <UpcomingMovieSlide />
    </div>
  )
}

export default Hompage