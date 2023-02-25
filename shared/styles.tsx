import { css, Global, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 3rem 1rem;
        margin: 0;
        background: papayawhip;
        min-height: 100%;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 24px;
      }
    `}
  />
);

export const lightTheme = {
  white: "#FFFFFF",

  bgColorLight: "#FFF8ED",
  bgColor: "#FFEED6",
  bgColorDark: "#FFE2B9",

  primary: "#FB8500",
  primaryDark: "#C47501",
  primaryLight: "#dc7400",

  secondaryLight: "#8FFD66",
  secondary: "#44FB00",
  secondaryDark: "#36C900",

  borderColor: "#DBDBDB",
  gray: "#bfbfbf",

  bgGrayLight: "#FDF8F1",
  bgGray: "#F0F0F0",
  bgGrayDark: "#eaeaea",

  fontColorLight: "#606060",
  fontColor: "#404040",
  fontColorDark: "#202020",

  fontLightGray: "#E9E9E9",
  fontGray: "#8E8E8E",
  fontDarkGray: "#65665B",

  blueLight: "#E0EDFD",
  blue: "#2688D4",
  blueDark: "#0663B0",

  danger: "#FF6347",
};
