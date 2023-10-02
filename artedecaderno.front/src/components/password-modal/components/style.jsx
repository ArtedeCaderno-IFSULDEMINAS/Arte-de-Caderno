import { colors } from "src/styles/constants";
import { animateOnTop } from "src/styles/animation";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 9999999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ModalCard = styled.div`
  background-color: ${colors.lightGrey};
  width: 50%;
  border: 1px solid black;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${animateOnTop} 1.1s;
`;

const ModalContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`;

export { ModalOverlay, ModalCard, ModalContent };
