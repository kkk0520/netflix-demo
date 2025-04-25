import api from "../utils/api"
import { useQuery } from "@tanstack/react-query"

const fetchMovieDetail = (movieId) => {
    console.log("훅 디테일");
    console.log("훅 무비아이디 : ", movieId)
    
    return api.get(`/movie/${movieId}?language=en-US`);


    //return api.get(`/movie/${movieId}`)
}

export const useMovieDetailQuery=(movieId)=>{
    return useQuery({
        queryKey: ['movie-detail', movieId],
        queryFn: ()=>fetchMovieDetail(movieId),
        suspense: true,
        select: (result)=>result.data
    })
}
