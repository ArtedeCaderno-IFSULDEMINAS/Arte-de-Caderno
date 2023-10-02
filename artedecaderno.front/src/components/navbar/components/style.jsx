import styled, { keyframes } from "styled-components";
import { Row } from "src/styles/sharedStyles";
import { colors, fonts } from "src/styles/constants";

const slideInTop = keyframes`
  0% {
      -webkit-transform: translateY(-60px);
      transform: translateY(-60px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
`;

const NavbarRow = styled(Row)`
  width: 100vw;
  height: 70px;
  background-color: ${colors.lightGrey};
  padding: 5px;
  gap: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  justify-content: space-between;
`;

const MenuContainer = styled(Row)`
  width: ${(p) => p.width};
`;

const NavLink = styled.p`
  font-family: ${fonts.raleway} !important;
  font-size: 16px;
  opacity: 0.7;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
    opacity: 1;
  }
`;

const NavDrop = styled.div`
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  background-color: ${colors.lightGrey};
  position: fixed;
  top: 70px;
  left: 0;
  width: 100vw;
  z-index: 99999;
  gap: 1rem;
  padding: 5px 0;

  -webkit-animation: ${slideInTop} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export { NavbarRow, MenuContainer, NavLink, NavDrop };
