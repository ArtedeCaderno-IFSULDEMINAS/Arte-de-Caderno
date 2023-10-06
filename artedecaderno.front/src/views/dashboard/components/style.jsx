import { colors, fonts } from "src/styles/constants";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: ${(p) => (p.desktop ? "300px" : "90%")} !important;
  height: 200px;
  box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 1rem;

  &:hover {
    cursor: pointer;
    background-color: ${colors.white};
    color: white !important;
  }
`;

const CardHeader = styled.div`
  align-items: center;
  color: ${colors.darkGrey};
  display: flex;
  height: 40%;
  justify-content: space-between;
  width: 100%;
`;

const CardSpan = styled.span`
  font-family: ${(p) => p.font || fonts.raleway};
  font-weight: ${(p) => p.weight || 400};
  font-size: ${(p) => p.size || "30px"};
  text-align: right;
`;

const CardBody = styled.div`
  align-self: flex-end;
  display: flex;
  margin: 1rem;
  width: auto;
`;

export { CardContainer, CardHeader, CardSpan, CardBody };
