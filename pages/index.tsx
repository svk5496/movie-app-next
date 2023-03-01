import { Jost } from "next/font/google";
import styled from "@emotion/styled";
import Seo from "@/components/atoms/Seo";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "@/components/molecules/MovieCard";
import Stack from "@/components/atoms/layout/Stack";
import { useEffect, useState } from "react";

const Base = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export default function Home() {
  const API_KEY = "e87412351932ff46d3887beef3d19d45";
  const ImagePath = "https://image.tmdb.org/t/p/w500";
  const [movieData, setMovieData] = useState<any[]>([]);

  const getMovies = async () => {
    return await axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => setMovieData(res.data.results));
  };

  const { isLoading, error, data } = useQuery("movies", getMovies);

  console.log(movieData);
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
                  margin="10px"
                ></MovieCard>
              );
            })}
          </>
        </Stack>
      </Base>
    </>
  );
}
