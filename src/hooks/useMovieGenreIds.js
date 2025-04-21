import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGenreList=()=>{
    return api.get(`/genre/movie/list`)
}

export const useGenreListQuery=()=>{
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: fetchGenreList,
        select: (result) => result.data.genres,
        staleTime: 300000
    })
}
