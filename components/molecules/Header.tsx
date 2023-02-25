import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { ButtonText } from "../atoms/ButtonText";

const Base = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
`;

const MenuWrapper = styled.div`
  width: 40%;
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

        <ButtonText
          onClick={() => router.push("/nutrient")}
          label="영양성분"
          variant="ghost"
        ></ButtonText>
        <ButtonText
          onClick={() => router.push("/healthGoal")}
          label="건강목표"
          variant="ghost"
        ></ButtonText>
      </MenuWrapper>
      <UserInfoWrapper></UserInfoWrapper>
    </Base>
  );
}
