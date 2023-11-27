import { colors } from "src/styles/constants";
import styled from "styled-components";

const SliderWrapper = styled.div`
  height: ${(props) => props.height || "auto"};
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  gap: 8px;
  padding: 1rem;

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

const SliderItem = styled.div`
  min-width: 200px;
  height: ${(props) => props.height || "100px"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { SliderWrapper, SliderItem };
