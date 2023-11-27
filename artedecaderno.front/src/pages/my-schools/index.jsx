import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MySchoolsView from "src/views/my-schools";

const MySchools = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("accessType") !== "professor") {
      navigate("/dashboard");
    }
  }, []);
  return <MySchoolsView/>
};

export default MySchools;
