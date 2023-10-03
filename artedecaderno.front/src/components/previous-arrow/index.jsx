import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
          <FontAwesomeIcon icon={faCircleArrowLeft} /> Voltar
        </BodyLink>
      )}
      {!navigate && (
        <BodyLink onClick={() => back(-1)}>
          <FontAwesomeIcon icon={faCircleArrowLeft} /> Voltar
        </BodyLink>
      )}
    </Row>
  );
};

export default PreviousArrow;
