import { Jost } from "next/font/google";
import styled from "@emotion/styled";
import Seo from "@/components/atoms/Seo";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "@/components/molecules/MovieCard";
import Stack from "@/components/atoms/layout/Stack";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Base = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default function Home() {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const ImagePath = "https://image.tmdb.org/t/p/w500";
  const [page, setPage] = useState(1);
  const router = useRouter();

  const getMovies = async () =>
    await axios
      .get(`https://api.themoviedb.org/3/movie/popular`, {
        params: {
          api_key,
          page,
        },
        //withCredentials: true, ==> cors μ΅μ
      })
      .then((res) => res.data);

  useEffect(() => {
    getMovies();
  }, []);

  const {
    data, // π‘ data.pagesλ₯Ό κ°κ³  μλ λ°°μ΄
    error, // error κ°μ²΄
    isFetching, // μ²« νμ΄μ§ fetching μ¬λΆ, Boolean, μ μμ°μΈλ€
    status, // π‘ loading, error, success μ€ νλμ μν, string
  } = useQuery("movies", getMovies, {});

  const handleClick = (movieId: number | string) => {
    router.push(`/movie/${movieId}`);
  };
  console.log(data);

  return (
    <>
      <Seo title="ν"></Seo>
      <Base>
        <Stack>
          {status === "success" ? (
            <>
              {data.results.map((movie: any) => {
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
          ) : (
            <div></div>
          )}
        </Stack>
      </Base>
    </>
  );
}
