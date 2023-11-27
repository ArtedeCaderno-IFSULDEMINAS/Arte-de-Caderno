import { colors, fonts } from "src/styles/constants";
import styled from "styled-components";

const TableContainer = styled.div`
  width: ${(props) => props.width || "100%"};
  margin-bottom: 20px;
  height: 50vh;
  max-height: 60vh;
  border-radius: 5px;
  overflow-y: scroll;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: auto;
  gap: 1rem;
`;

const THead = styled.thead`
  padding: 10px;
  border: none;
  margin-bottom: 1rem;
`;

const TH = styled.th`
  text-transform: uppercase;
  font-family: ${fonts.league};
  font-weight: 600;
`;

const TBody = styled.tbody`
  padding: 10px;
  max-height: 50vh;
  overflow-y: scroll;
  width: ${(props) => props.width || "100%"};
`;

const TR = styled.tr`
  &:hover {
    background-color: ${colors.lightGrey};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  background-color: ${(props) => (props.even ? colors.lightGrey : "inherit")};
`;

const TD = styled.td`
  padding: 10px;
  text-align: center;
  font-family: ${fonts.raleway};
`;

export { StyledTable, THead, TH, TBody, TR, TD, TableContainer };
