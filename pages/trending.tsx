import { Jost } from "next/font/google";
import styled from "@emotion/styled";
import Seo from "@/components/atoms/Seo";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import MovieCard from "@/components/molecules/MovieCard";
import Stack from "@/components/atoms/layout/Stack";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useObserver } from "../hook/useObserver";

const Base = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default function Trending() {
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
        //withCredentials: true, ==> cors ์ต์
      })
      .then((res) => res.data);

  useEffect(() => {
    getMovies();
  }, []);

  const bottom = useRef(null);

  const {
    data, // ๐ก data.pages๋ฅผ ๊ฐ๊ณ  ์๋ ๋ฐฐ์ด
    error, // error ๊ฐ์ฒด
    fetchNextPage, // ๐ก ๋ค์ ํ์ด์ง๋ฅผ ๋ถ๋ฌ์ค๋ ํจ์
    hasNextPage, // ๋ค์ ํ์ด์ง๊ฐ ์๋์ง ์ฌ๋ถ, Boolean
    isFetching, // ์ฒซ ํ์ด์ง fetching ์ฌ๋ถ, Boolean, ์ ์์ฐ์ธ๋ค
    isFetchingNextPage, // ์ถ๊ฐ ํ์ด์ง fetching ์ฌ๋ถ, Boolean
    status, // ๐ก loading, error, success ์ค ํ๋์ ์ํ, string
  } = useInfiniteQuery("movies", getMovies, {
    getNextPageParam: (lastPage, allPages) => {
      // ๋์ ์ฌ :  ์กฐ๊ฑด ? Number : falsyํ ๋ชจ๋  ๊ฐ ( api์ ๋ฐ๋ผ ๋ค๋ฅผ ๊ฒ์ด๋ค ),
      // ์ํ api๊ฐ์ ๊ฒฝ์ฐ, lastPage.page ๊ฐ total_page๋ณด๋ค ์์ ๊ฒฝ์ฐ, ์์ง ํ์ด์ง๊ฐ ๋จ์์์์ผ๋ก, page+1์ ๋ฆฌํดํ๋๋ก ๋ง๋ ๊ฒ.
      if (lastPage.page >= lastPage.total_page) {
        return false;
      }
      return lastPage.page + 1;
    },
  });
  console.log(data?.pages);

  const handleClick = (movieId: number | string) => {
    router.push(`/movie/${movieId}`);
  };

  // useObserver๋ก ๋๊ฒจ์ค callback, entry๋ก ๋์ด์ค๋ HTMLElement๊ฐ
  // isIntersecting์ด๋ผ๋ฉด ๋ฌดํ ์คํฌ๋กค์ ์ํ fetchNextPage๊ฐ ์คํ๋  ๊ฒ์ด๋ค.
  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <>
      <Seo title="ํ"></Seo>
      <Base>
        <Stack>
          {status === "success" ? (
            <>
              {/* ์ด์ค ๋ฃจํ๋ฅผ ๋๋ฆผ */}
              {data.pages.map((page, index) => {
                return (
                  <Stack key={index}>
                    <>
                      {page.results.map((movie: any) => {
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
                );
              })}
            </>
          ) : (
            <div></div>
          )}
        </Stack>
        <div ref={bottom}></div>
      </Base>
    </>
  );
}
