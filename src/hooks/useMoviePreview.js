import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMoviePreview = (queryData) => {
  const id = queryData.queryKey[1];
  return api.get(`/movie/${id}/videos?language=en-US`);
};

export const useMoviePreviewQuery = (id) => {
  return useQuery({
    queryKey: ["movie-trailer", id],
    queryFn: fetchMoviePreview,
    refetchOnMount: false,
    select: (result)=>result.data
  });
};
