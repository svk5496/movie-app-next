import { Jost } from "next/font/google";
import styled from "@emotion/styled";
import Seo from "@/components/atoms/Seo";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "@/components/molecules/MovieCard";
import Stack from "@/components/atoms/layout/Stack";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

const Base = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default function Home() {
  const api = process.env.NEXT_PUBLIC_API_KEY;
  const ImagePath = "https://image.tmdb.org/t/p/w500";
  const [movieData, setMovieData] = useState<any[]>([]);
  const router = useRouter();

  const getMovies = async () => {
    return await axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${api}`)
      .then((res) => setMovieData(res.data.results));
  };

  const { isLoading, error, data } = useQuery("movies", getMovies);

  const handleClick = (movieId: number | string) => {
    router.push(`/movie/${movieId}`);
  };
  return (
    <>
      <Seo title="홈"></Seo>
      <Base>
        <Stack>
          <>
            {movieData.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  vote_count={movie.vote_count}
                  adult={movie.adult}
                  image_path={ImagePath}
                  poster_path={movie.poster_path}
                  overview={movie.overview}
                  popularity={movie.popularity}
                  genre_ids={movie.genre_ids}
                  release_date={movie.release_date}
                  onClick={() => handleClick(movie.id)}
                ></MovieCard>
              );
            })}
          </>
        </Stack>
      </Base>
    </>
  );
}
