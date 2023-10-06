import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardBody, CardContainer, CardHeader, CardSpan } from "./style";
import { icons } from "src/styles/icons";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { fonts } from "src/styles/constants";

const DashboardCard = ({ title, value, icon, desktop, path }) => {
  const [redirect, setRedirect] = useState(false);
  return (
    <CardContainer desktop={desktop} onClick={() => setRedirect(true)}>
      {redirect && <Navigate to={path} replace />}
      <CardHeader>
        <CardSpan font={fonts.league} size={"70px"} weight={700}>
          {value}
        </CardSpan>

        <CardSpan style={{ justifySelf: value ? "flex-end" : "flex-start" }}>
          <FontAwesomeIcon icon={icons[icon]} fontSize={"40px"} />
        </CardSpan>
      </CardHeader>
      <CardBody>
        <CardSpan style={{ color: "black" }} weight={400} size={"20px"}>
          {title}
        </CardSpan>
      </CardBody>
    </CardContainer>
  );
};

export default DashboardCard;
