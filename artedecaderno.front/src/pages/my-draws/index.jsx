import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate} from "react-router";
import MyDrawsView from "src/views/my-draws";

const MyDraws = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.title = "Arte de Caderno | Meus desenhos";
    const access = Cookies.get("accessType");
    if (access !== "student") {
      navigate("/dashboard");
    }
  }, []);
  return <MyDrawsView/>
};

export default MyDraws;
