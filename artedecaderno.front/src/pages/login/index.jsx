import { useEffect } from "react";
import LoginView from "src/views/login";

const Login = () => {
  useEffect(() => {
    document.title = " Arte de Caderno | Entrar";
  }, []);
  return <LoginView />;
};

export default Login;
