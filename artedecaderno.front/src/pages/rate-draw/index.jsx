import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RateDrawView from "src/views/rate-draw";

const RateDraw = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("accessType") !== "evaluator") {
      navigate("/dashboard");
    }
  }, []);
  return <RateDrawView/>
};

export default RateDraw;
