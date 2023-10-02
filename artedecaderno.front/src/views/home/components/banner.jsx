import { fonts } from "src/styles/constants";
import styled from "styled-components";

const BannerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  padding: 1rem;
`;

const BannerTitle = styled.h1`
  font-family: ${fonts.league};
  color: white;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 50px;
  font-weight: 900;
  text-transform: uppercase;
`;

export { BannerCard, BannerTitle };
