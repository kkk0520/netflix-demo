import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert, Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate';
import "bootstrap/dist/css/bootstrap.min.css";
import "./MoviePage.style.css"
import { useGenreListQuery } from '../../hooks/useMovieGenreIds'

// 경로 2가지
// navbar에서 클릭해서 온 경우 => popularMovie 보여주기(원래는 백엔드에서 알아서 보내줘야함)
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들 보여주기

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할 때마다 page 바꿔주기
// page 값이 바뀔 때 마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
  const sortList = [
    {id: "popularity.desc", name: "인기 많은순"},
    {id: "popularity.asc", name: "인기 적은순"},
    {id: "vote_average.desc", name: "평점 높은순"},
    {id: "vote_average.asc", name: "평점 낮은순"}
  ]

  const { data : genreData} = useGenreListQuery()

  // keyword url에서 읽어온다.
  const [query, setQuery] = useSearchParams()
  const [page, setPage] = useState(1)
  const [genre, setGenre] = useState(null);
  const [sort, setSort] = useState("");
  const [data, setData] = useState(null);
 
  let keyword = query.get('q');
 
  const {data : movieData, isLoading, isError, error} = useSearchMovieQuery({keyword, page, genre, sort})

console.log("무비데이터 : ", movieData?.results.length  )
  useEffect(() => {
    setPage(1);
  }, [keyword, genre, sort]);

  useEffect(()=>{
    if(keyword != ""){
      setGenre(null);
      setSort("");
    }
  }, [keyword])

  useEffect(() => {
    if (movieData) {
      setData(movieData);
    }
    if(genre || sort){
      keyword = "";
    }

  }, [movieData]);
/*
  useEffect(()=>{
    console.log(" useEffect keyword ", keyword)
    if(!keyword){    
      console.log("탔음")  
      setSort("")
      setGenre(null)
    }
  }, [keyword]);

  useEffect(() => {
    if (sort !== "") {
      sortMovie();
    }
  }, [sort, genre]);
*/
  const handlePageClick = ({selected}) => {
    setPage(selected + 1)
  }
  /*
  const sortMovie = () => {
    let sortedData = data
    if (sort === "popAsc") {
      sortedData = data.results.sort(
        (a, b) => a.popularity - b.popularity
      );     
    }
    else if( sort === "voteAsc"){
      sortedData = data.results.sort(
        (a, b) => a.vote_average - b.vote_average
      ); 
    }
    else if( sort === "voteDesc"){
      sortedData = data.results.sort(
        (a, b) => b.vote_average - a.vote_average
      ); 
    }
    else {
      // default popularity desc
      // popDesc
      sortedData = data.results.sort(
        (a, b) => b.popularity - a.popularity
      ); 
    }
    
    setData({ ...data, results: sortedData });
    
  };
*/
  const filterMovieByGenre = () => {

    const filteredData = movieData.results.filter((movie) => {
      return movie.genre_ids.includes(genre.id);
    });
    setData({ ...data, results: filteredData });
  };

  if(isLoading){
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem"}}
        />
      </div>
    );
  }

  if(isError){
    return <Alert variant="danger">{error.message}</Alert>
  }

  return (
   
    <Container>
      <div className="d-flex my-4">
      <Dropdown className="me-3">
        <Dropdown.Toggle variant="danger" id="dropdown-basic">
          {sort ? sortList?.find((sortBy) => sortBy.id === sort).name
          : "정렬 기준"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {sortList.map((sortBy, index)=>(
            <Dropdown.Item key={index} onClick={() =>{ keyword = ""; setSort(sortBy.id)}}>
            {sortBy.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="danger" id="dropdown-basic">
          {genre ? genreData.find((gen) => gen.id === genre).name : "장르별 검색"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {genreData?.map((item, index) => (
            <Dropdown.Item onClick={() => {keyword = ""; setGenre(item.id)}} key={index}>
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
      <Row>
        <Col lg={8} xs={12}>
          <Row className="movie-list" >
            {data?.results.length > 0 ? data?.results.map((movie, index)=>(
              <Col className="movie-list" key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            )) : <Alert variant="danger">검색 결과가 없습니다.</Alert>}
          </Row>
          {data?.results.length > 0 ?
          <ReactPaginate
            nextLabel="next >"            
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages > 500 ? 500 : data?.total_pages} // 전체페이지 수
            containerClassName="pagination"
            previousLabel="< prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page-1}
          />
          : <div></div>
}
        </Col>
      </Row>
    </Container>

  );
}


export default MoviePage