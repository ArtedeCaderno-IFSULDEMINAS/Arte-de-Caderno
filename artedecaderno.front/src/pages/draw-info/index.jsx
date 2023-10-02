import { useParams } from "react-router-dom";

const DrawInfo = () => {
  const { id } = useParams();

  return <h1>{id}</h1>;
};

export default DrawInfo;
