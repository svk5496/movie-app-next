import styled from "@emotion/styled";
import Link from "next/link";
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
          label="로고"
          variant="primary"
        ></ButtonText>
      </MenuWrapper>
      <UserInfoWrapper></UserInfoWrapper>
    </Base>
  );
}
