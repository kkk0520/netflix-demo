import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";



const fetchNowPlayingMovies=()=>{
    return api.get(`/movie/now_playing`)
}

console.log("훅 나우 result.data : " , fetchNowPlayingMovies())

export const useNowPlayingMoviesQuery=()=>{
    return useQuery({
        queryKey: ['movie-now-playing'],
        queryFn: fetchNowPlayingMovies,
        select: (result) => result.data,
        
    })
}