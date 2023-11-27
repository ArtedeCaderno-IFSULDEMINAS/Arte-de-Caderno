import { useNavigate } from "react-router-dom";
import { TD, TR } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "src/styles/icons";
import { Button } from "src/styles/sharedStyles";

const TableRow = ({ index, data, path }) => {
  const navigate = useNavigate();
  return (
    <TR>
      <TD style={{ fontWeight: 600 }}>{index + 1}</TD>
      <TD style={{ textAlign: "left" }}>{data.name}</TD>
      <TD>{data.uf.toUpperCase()}</TD>
      <TD >{data.email}</TD>
      <TD>
        <Button width={"auto"} onClick={() => navigate(`/${path}/${data._id}`)}>
          <FontAwesomeIcon icon={icons.info} />
        </Button>
      </TD>
    </TR>
  );
};

export default TableRow;
