import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Hompage from './pages/Homepage/Hompage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundpage/NotFoundPage';


// 홈페이지 : /
// 영화 전체 보여주는 페이지(서치) : /movies
// 영화 상세 페이지 : /movies/:id
// 추천 영화 : /movies/:id/recomandation
// 리뷰 : /movies/:id/reviews
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route index element={<Hompage/>}/>
        <Route path="movies">
          <Route index element={<MoviePage />}/>
          <Route path=":id" element={<MovieDetailPage />}/>
        </Route>
        {/*<Route path="/movies" element={<MoviePage/>}/>
        <Route path="/movies/:id" element={<MovieDetailPage/>}/>*/}
      </Route>

      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  );
}


export default App;
