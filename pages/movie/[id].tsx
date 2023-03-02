import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Detail() {
  const route = useRouter();
  const { id } = route.query;
  const api = process.env.NEXT_PUBLIC_API_KEY;
  const ImagePath = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState<any>([]);

  const getMovie = async () => {
    return await axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${api}`)
      .then((res) => setMovie(res.data));
  };

  const { isLoading, error, data } = useQuery("movie", getMovie, {
    enabled: !!id,
  });
  console.log(movie);

  return <div>{id}</div>;
}
