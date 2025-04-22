import React from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'

// 경로 2가지
// navbar에서 클릭해서 온 경우 => popularMovie 보여주기(원래는 백엔드에서 알아서 보내줘야함)
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들 보여주기

const MoviePage = () => {

  // keyword url에서 읽어온다.
  const [query, setQuery] = useSearchParams()
  const keyword = query.get('q')
  const {data, isLoading, isError, error} = useSearchMovieQuery(keyword)
  
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
        </Col>
      </Row>
    </Container>

  );
}


export default MoviePage