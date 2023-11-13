import { Text } from "src/styles/sharedStyles";
import {
  StyledTable,
  TBody,
  TH,
  THead,
  TableContainer,
} from "./components/style";
import TableRow from "./components/tr";

const Table = ({ headers, data, width }) => {
  console.log(data);
  return (
    <TableContainer width={width}>
      <StyledTable>
        {data && (
          <>
            <THead>
              {headers.map((head, index) => {
                return <TH key={index}>{head}</TH>;
              })}
            </THead>
            <TBody>
              {data.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    index={index}
                    even={index % 2 === 0 ? true : false}
                    data={item}
                  />
                );
              })}
            </TBody>
          </>
        )}
        {!data && (
          <TBody>
            <Text>Sem alunos cadastrados...</Text>
          </TBody>
        )}
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
