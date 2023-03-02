import styled from "@emotion/styled";

const Base = styled.div<StyleProps>`
  width: 45%;
  padding: 10px;

  height: 600px;
  display: flex;
  flex-direction: column;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  word-break: keep-all;
`;

interface StyleProps {
  margin: string;
}

interface MovieCardProps {
  id: number;
  title: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  poster_path: string;
  image_path: string;
  overview: string;
  popularity: number;
  genre_ids: number[];
  release_date: string;
  margin?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export default function MovieCard({
  id,
  title,
  vote_average,
  vote_count,
  adult,
  poster_path,
  image_path,
  overview,
  popularity,
  genre_ids,
  release_date,
  margin = "0px",
  onClick = () => {},
}: MovieCardProps) {
  return (
    <Base margin={margin} onClick={onClick}>
      <ImageBox>
        <img src={image_path + poster_path}></img>
      </ImageBox>
      <TextBox>
        <h3>{title}</h3>
        <p>{overview}</p>
      </TextBox>
    </Base>
  );
}
