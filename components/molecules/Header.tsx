import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ButtonText } from "../atoms/ButtonText";

const Base = styled.div`
  width: 100%;
  min-width: 370px;
  max-width: 420px;
  height: 60px;
  display: flex;
  position: fixed;
  top: 0;
  background-color: white;
  border-bottom: 1px solid lightgray;
`;

const MenuWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
`;

const UserInfoWrapper = styled.div``;

export default function Header() {
  const router = useRouter();
  return (
    <Base>
      <MenuWrapper>
        <ButtonText
          onClick={() => router.push("/")}
          label="HOME"
          variant="primary"
        ></ButtonText>
        <ButtonText
          label="Trending"
          variant="ghost"
          onClick={() => router.push("/trending")}
        ></ButtonText>
        <ButtonText
          label="Adult"
          variant="ghost"
          onClick={() => router.push("/popular")}
        ></ButtonText>
      </MenuWrapper>
      <UserInfoWrapper></UserInfoWrapper>
    </Base>
  );
}
