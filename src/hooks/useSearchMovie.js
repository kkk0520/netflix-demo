import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"


// 장르 별 영화 데이터
//`${BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=ko-KR`
// :api.get(`/movie/popular?page=${page}`)
// `/discover/movie?language=ko-KR&page=${page}&with_genres=${genreId}&sort_by=${popularValue}`
const fetchSearchMovie=({keyword, page, genre, sort})=>{
    console.log("keyword : " , keyword )
    console.log("page : " , page )
    console.log("genre : " , genre )
    console.log("sort : " , sort )
    
    if(genre && sort){
        console.log("훅 1 : genre && sort : ", genre + " sort : ", sort)
        return api.get(`/discover/movie?page=${page}&with_genres=${genre}&sort_by=${sort}`)
    }
    else if (genre){
        console.log("훅 2 : genre : ", genre)
        return api.get(`/discover/movie?page=${page}&with_genres=${genre}`)
    }
    else if (sort){
        console.log("훅 정렬만 : ", sort)
        return api.get(`/discover/movie?page=${page}&sort_by=${sort}`)
    }
    else if (keyword){
        console.log("훅 키워드만 : ", keyword)
//        genre = null
//        sort = ""
        return api.get(`/search/movie?query=${keyword}&page=${page}`)
    }


    else {
        console.log("훅 4 ")
        return api.get(`/movie/popular?page=${page}`)
    }

  //  return genre?api.get(`/discover/movie?page=${page}&with_genres=${genre}`)
  //  :
  //  (keyword?api.get(`/search/movie?query=${keyword}&page=${page}`):api.get(`/movie/popular?page=${page}`))
}

//return keyword?api.get(`/search/movie?query=${keyword}&page=${page}`)
//:api.get(`/discover/movie?page=${page}&with_genres=${genre}`)




  

export const useSearchMovieQuery=({keyword, page, genre, sort})=>{
    return useQuery({
        queryKey: ['movie-searh', {keyword, page, genre, sort}],
        queryFn: ()=>fetchSearchMovie({keyword, page, genre, sort}),
        select: (result)=>result.data

    })
}