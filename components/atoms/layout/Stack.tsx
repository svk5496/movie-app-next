import styled from "@emotion/styled";
import React from "react";

const Base = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

interface StackProps {
  children: React.ReactElement;
}

export default function Stack({ children }: StackProps) {
  return <Base>{children}</Base>;
}
