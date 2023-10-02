import { useState } from "react";
import { Draw } from "./styles";
import { Navigate } from "react-router-dom";

const DrawImg = ({ draw }) => {
  const [redirect, setRedirect] = useState(false);

  return (
    <>
      {redirect && <Navigate to={`/desenho/${draw.id}`} replace />}
      <Draw src={draw.img} />
    </>
  );
};

export default DrawImg;
