import { Text } from "src/styles/sharedStyles";
import {
  StyledTable,
  TBody,
  TH,
  THead,
  TableContainer
} from "./components/style";
import TableRow from "./components/tr";
import { useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "src/styles/icons";

const Table = ({ headers, data, width, path }) => {
  console.log(data);
  const [dados, setDados] = useState(false);

  useLayoutEffect(() => {
    if (data.length > 0) {
      setDados(true);
    }
  }, [data]);

  return (
    <TableContainer width={width}>
      <StyledTable>
        {dados && (
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
                    path={path}
                  />
                );
              })}
            </TBody>
          </>
        )}
        {!dados && (
          <TBody>
            <Text>
              Não há nada por aqui... <FontAwesomeIcon icon={icons.cancel} />{" "}
            </Text>
          </TBody>
        )}
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
