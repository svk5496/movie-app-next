import { ButtonText } from "@/components/atoms/ButtonText";
import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Base = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

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

  const { isLoading, error, data, status } = useQuery("movie", getMovie, {
    enabled: !!id,
  });
  console.log(movie);

  return (
    <Base>
      <ImageWrapper>
        <img src={ImagePath + movie.poster_path}></img>
      </ImageWrapper>
      <h3>{movie.title}</h3>
      <span>{movie.overview}</span>
      <ButtonWrapper>
        <ButtonText
          variant="primary"
          label="Make Reservation"
          onClick={() => alert("예약 홈으로 이동")}
        ></ButtonText>
      </ButtonWrapper>
    </Base>
  );
}
