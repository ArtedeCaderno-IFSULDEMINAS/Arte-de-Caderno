import styled from "styled-components";

const GalleryContainer = styled.div`
  --webkit-column-count: 4;
  --moz-column-count: 4;
  column-count: 4;

  --webkit-column-width: 25%;
  --moz-column-width: 25%;
  column-width: 25%;
  padding: 1rem 0.5rem;

  @media screen and (max-width: 991px) {
    --webkit-column-count: 2;
    --moz-column-count: 2;
    column-count: 2;
  }

  @media screen and (max-width: 768px) {
    --webkit-column-count: 1;
    --moz-column-count: 1;
    column-count: 1;
    --webkit-column-width: 100%;
  --moz-column-width: 100%;
  column-width: 100%;
  }

`;

const Draw = styled.img`
  --webkit-transition: all 350ms ease;
  transition: all 350ms ease;
  margin-top: 12px;
  width: 100%;

  /* &:hover{
    filter: opacity(0.7);
  } */

`;

export { GalleryContainer, Draw };
