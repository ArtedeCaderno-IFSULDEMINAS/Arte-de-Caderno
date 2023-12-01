import styled from "styled-components";
import { colors, fonts } from "./constants";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: ${(p) => p.width || "100%"};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: ${(p) => p.width || "100%"};
  gap: ${(p) => p.gap || "5px"};

  @media screen and (max-width: 768px) {
    flex-direction: column
  }

`;

const PageContainer = styled(Column)`
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden !important;
  min-height: 100vh;
`;

const ContentContainer = styled(PageContainer)`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  width: 100vw;
`;

const Title = styled.h1`
  font-family: ${(p) => p.font || fonts.league};
  color: ${(p) => p.color || "white"};
`;

const Button = styled.button`
  background-color: ${(p) => p.bg || "black"};
  border-radius: 10px;
  width: ${(p) => p.width || "200px"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.color || "white"};
  text-transform: ${(p) => p.textTransform || "uppercase"};
  border: none;
  padding: 10px;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.hover || colors.darkGrey};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(p) => p.color || "white"};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 1.5rem 1rem;
  width: ${(p) => p.width || "100%"};
  border-radius: 6px;
`;

const Text = styled.p`
  font-family: ${(p) => p.font || fonts.quicksand};
  font-size: ${(p) => p.size || "16px"};
  text-align: ${(p) => p.align || "center"};

  @media screen and (max-width: 768px) {
    text-align: justify;
  }
`;

const Label = styled.label`
  font-family: ${fonts.raleway};
  font-size: ${(p) => p.size || "16px"};
  font-weight: 500;
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 6px;
  width: ${(p) => p.width || "100%"};
  height: ${(p) => p.height || "30px"};
  padding: 5px;
  font-family: ${fonts.league};
  font-size: 16px;

  &:disabled {
    cursor: not-allowed;
    background-color: ${colors.lightGrey};
  }
`;

const Select = styled.select`
  border: 1px solid black;
  border-radius: 6px;
  width: ${(p) => p.width || "100%"};
  height: ${(p) => p.height || "30px"};
  padding: 5px;
  font-family: ${fonts.league};
  display: flex;
  align-items: center;
`;

const Option = styled.option`
  padding: 5px;
  height: 30px;
`;

const InputColumn = styled(Column)`
  justify-content: flex-start;
  align-items: start;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  gap: 1rem;
`;

const BodyLink = styled.p`
  font-family: ${fonts.raleway} !important;
  font-size: 16px;
  opacity: 0.7;
  color: black;
  text-decoration-color: black !important;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
    opacity: 1;
  }
`;

export {
  Column,
  Row,
  PageContainer,
  ContentContainer,
  Title,
  Button,
  Container,
  Text,
  Label,
  Input,
  InputColumn,
  Form,
  BodyLink,
  Select,
  Option,
};
