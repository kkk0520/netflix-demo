import React from 'react'
import { Alert, Badge, Col, Container, Row, Spinner } from 'react-bootstrap'
import Reviews from "./components/Reviews";
import { useParams } from 'react-router-dom';
import { numberWithCommas } from '../../utils/number';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useMoviePreviewQuery } from '../../hooks/useMoviePreview';
import YouTube from 'react-youtube';
import "./MovieDetailPage.style.css"


const MovieDetailPage = () => {

  console.log("MOVIE DETAIL 페이지 진입")
  const { id } = useParams();
  console.log("무비아이디 : ", id)
  const { data, isLoading, isError, error } = useMovieDetailQuery(id)
  const { data: previewData, isLoading: previewIsLoading, previewIsError, previewError } = useMoviePreviewQuery(id)

  console.log("디테일데이타 : ", data)
  console.log("프리뷰데이타 : ", previewData)
  
  const opts={
    playerVars: {      
      autoplay: 1, //자동재생 O
      rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
      modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
    },
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
      <Container className="pb-5">
        <Row>
        <Col className="mt-5">                    
            <YouTube
              videoId={previewData?.results[0].key}
              opts={opts}              
              className="youtube-frame"
            />
          </Col>
          </Row>
         
          <Row>
          <Col className="mt-5">
            <div className="d-flex mb-4">
              {data?.genres.map((genre, index) => (
                <Badge bg="danger" key={index}>{genre.name}</Badge>
                
              ))}
            </div>
            <h1 className="movie-title">{data?.title}</h1>
            <h3>{data?.tagline}</h3>
            <div className="py-4 movie-number  border-bottom border-white">
              <span>
                <img src="/images/IMDB.png" width={30} className="me-1" />
                {data?.vote_average}
              </span>
              <span>
                <img src="/images/people4.png" width={30} className="ms-3 me-1" />
                {data?.popularity}
              </span>
              <span>
                {data?.adult ? (
                  <img src={"/images/over18.svg"} width={30} className="ms-2" />
                ) : (
                  <img src={"/images/under18.svg"} width={30} className="ms-2" />
                )}
              </span>
            </div>
            <div className="py-4 border-bottom border-white">
              {data?.overview}
            </div>
            <div className="py-4">
              <div className="d-flex align-items-center mb-2">
                <div className="movie-detail-badge me-2">Budget</div>
                <div>$ {numberWithCommas(data?.budget)}</div>
              </div>

              <div className="d-flex align-items-center mb-2">
                <div className="movie-detail-badge me-2">Revenue</div>
                <div>$ {numberWithCommas(data?.revenue)}</div>
              </div>

              <div className="d-flex align-items-center mb-2">
                <div className="movie-detail-badge me-2">Release Date</div>
                <div>{data?.release_date}</div>
              </div>

              <div className="d-flex align-items-center mb-2">
                <div className="movie-detail-badge me-2">Run time</div>
                <div>{data?.runtime}분</div>
              </div>
            </div>
          </Col>
        </Row>
        <Reviews id={data?.id}/>
      </Container>
  )
}

export default MovieDetailPage;
