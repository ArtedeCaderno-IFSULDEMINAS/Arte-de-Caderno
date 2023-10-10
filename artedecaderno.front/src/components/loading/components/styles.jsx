import { loading } from "src/styles/animations";
import styled from "styled-components";

const LetterBox = styled.div`
  background-color: black;
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
`;

const LoadingBar = styled.div`
  width: 0px;
  height: 32px;
  background-color: black;
  border-radius: 15px;
  display: flex;
  align-items: center;
  z-index: -999;
  animation: ${loading} 5s infinite linear;
  position: absolute;
  justify-self: flex-start;
`;

export { LetterBox, LoadingBar };
