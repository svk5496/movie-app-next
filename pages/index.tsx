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
      })
      .then((res) => res.data);

  useEffect(() => {
    getMovies();
  }, []);

  const bottom = useRef(null);

  const {
    data, // 💡 data.pages를 갖고 있는 배열
    error, // error 객체
    fetchNextPage, // 💡 다음 페이지를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부, Boolean
    isFetching, // 첫 페이지 fetching 여부, Boolean, 잘 안쓰인다
    isFetchingNextPage, // 추가 페이지 fetching 여부, Boolean
    status, // 💡 loading, error, success 중 하나의 상태, string
  } = useInfiniteQuery("movies", getMovies, {
    getNextPageParam: (lastPage, allPages) => {
      // 대전재 :  조건 ? Number : falsy한 모든 값 ( api에 따라 다를 것이다 ),
      // 영화 api같은 경우, lastPage.page 가 total_page보다 작은 경우, 아직 페이지가 남아있음으로, page+1을 리턴하도록 만든것.
      if (lastPage.page >= lastPage.total_page) {
        return false;
      }
      return lastPage.page + 1;
    },
  });
  const handleClick = (movieId: number | string) => {
    router.push(`/movie/${movieId}`);
  };

  // useObserver로 넘겨줄 callback, entry로 넘어오는 HTMLElement가
  // isIntersecting이라면 무한 스크롤을 위한 fetchNextPage가 실행될 것이다.
  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <>
      <Seo title="홈"></Seo>
      <Base>
        <Stack>
          {status === "success" ? (
            <>
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
