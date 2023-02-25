import Header from "@/components/molecules/Header";
import React from "react";

export default function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
    </>
  );
}
