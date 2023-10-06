import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { icons } from "src/styles/icons";
import { BodyLink, Row } from "src/styles/sharedStyles";

const PreviousArrow = ({ navigate, width }) => {
  const back = useNavigate();
  const [navigateBack, setNavigate] = useState(false);
  return (
    <Row
      width={width}
      style={{
        justifyContent: "flex-start",
      }}
    >
      {navigate && navigateBack && <Navigate to={navigate} replace />}
      {navigate && (
        <BodyLink onClick={() => setNavigate(true)}>
          <FontAwesomeIcon icon={icons.back} /> Voltar
        </BodyLink>
      )}
      {!navigate && (
        <BodyLink onClick={() => back(-1)}>
          <FontAwesomeIcon icon={icons.back} /> Voltar
        </BodyLink>
      )}
    </Row>
  );
};

export default PreviousArrow;
