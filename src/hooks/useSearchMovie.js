import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"


// 장르 별 영화 데이터
//`${BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=ko-KR`
// :api.get(`/movie/popular?page=${page}`)

const fetchSearchMovie=({keyword, page, genre})=>{
    console.log("써치 훅 장르 : ", genre)
    console.log("써치 훅 keyword : ", keyword)
    console.log("써치 훅 page : ", page)
    return genre?api.get(`/discover/movie?page=${page}&with_genres=${genre}`)
    :
    (keyword?api.get(`/search/movie?query=${keyword}&page=${page}`):api.get(`/movie/popular?page=${page}`))
}

//return keyword?api.get(`/search/movie?query=${keyword}&page=${page}`)
//:api.get(`/discover/movie?page=${page}&with_genres=${genre}`)




  

export const useSearchMovieQuery=({keyword, page, genre})=>{
    return useQuery({
        queryKey: ['movie-searh', {keyword, page, genre}],
        queryFn: ()=>fetchSearchMovie({keyword, page, genre}),
        select: (result)=>result.data

    })
}