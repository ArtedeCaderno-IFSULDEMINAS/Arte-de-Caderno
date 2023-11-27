import { createGlobalStyle } from "styled-components";
import { colors } from "./styles/constants";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

  &::-webkit-scrollbar {
    margin-top: 1rem;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${colors.lightGrey};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.grey};
    border-radius: 8px;

    &:hover {
      background-color: ${colors.darkGrey};
    }
    
  }
`;

export default GlobalStyle;
