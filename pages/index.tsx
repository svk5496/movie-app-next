import { Jost } from "next/font/google";
import styled from "@emotion/styled";
import Seo from "@/components/atoms/Seo";
import { useQuery } from "react-query";
import axios from "axios";

const Base = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const NavBar = styled.div`
  width: 100%;
  height: 60px;
  background-color: tomato;
`;

export default function Home() {
  const API_KEY = "e87412351932ff46d3887beef3d19d45";
  const getMovies = async () => {
    return await axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.data);
  };

  const { isLoading, error, data, isFetching } = useQuery("movies", getMovies);

  console.log(data);
  return (
    <>
      <Seo title="홈"></Seo>
      <Base>
        <div>index</div>
      </Base>
    </>
  );
}
