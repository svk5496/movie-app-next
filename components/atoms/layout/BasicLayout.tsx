import Header from "@/components/molecules/Header";
import styled from "@emotion/styled";
import React from "react";

const Base = styled.div`
  width: 100vw;
  min-width: 370px;
  max-width: 420px;
  padding-top: 80px;
`;

export default function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header></Header>
      <Base>{children}</Base>
    </>
  );
}
