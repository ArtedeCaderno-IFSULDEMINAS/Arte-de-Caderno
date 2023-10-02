import { Column } from "src/styles/sharedStyles";
import styled from "styled-components";

const AlignedColumn = styled(Column)`
  align-items: ${(p) => p.justify || "space-between"};
  width: ${(p) => p.width || "100%"};
  gap: 1rem;
`;

export {AlignedColumn}
