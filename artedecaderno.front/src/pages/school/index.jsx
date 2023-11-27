import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SchoolView from "src/views/school";

const School = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if(Cookies.get("accessType") !== "professor"){
      navigate("/dashboard");
    }
  }, []);
  return (
    <SchoolView/>
  )
}

export default School