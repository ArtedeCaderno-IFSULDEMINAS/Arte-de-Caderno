import { useEffect } from "react";
import TwoFactorView from "src/views/two-factor";

const TwoFactor = () => {
  useEffect(() => {
    document.title = "Arte de Caderno | Segurança";
  }, []);
  
  return <TwoFactorView />;
};

export default TwoFactor;
