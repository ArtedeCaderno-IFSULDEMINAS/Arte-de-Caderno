import styled from "styled-components";

const Banner = styled.div`
  min-height: calc(100vh - 70px);
  width: 100vw;
  max-width: 100vw !important;
  background-image: url(${(p) => p.img});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
`;

export { Banner };
