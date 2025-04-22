import React, { useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate';
import "bootstrap/dist/css/bootstrap.min.css";
import "./MoviePage.style.css"

// 경로 2가지
// navbar에서 클릭해서 온 경우 => popularMovie 보여주기(원래는 백엔드에서 알아서 보내줘야함)
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들 보여주기

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할 때마다 page 바꿔주기
// page 값이 바뀔 때 마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {

  // keyword url에서 읽어온다.
  const [query, setQuery] = useSearchParams()
  const [page, setPage] = useState(1)
  const keyword = query.get('q')
  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page})
  const handlePageClick = ({selected}) => {
    setPage(selected + 1)
  }
  
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
      <Row>
        <Col lg={4} xs={12}>
        {""}
         필터{""}
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index)=>(
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="next >"            
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data.total_pages} // 전체페이지 수
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
        </Col>
      </Row>
    </Container>

  );
}


export default MoviePage