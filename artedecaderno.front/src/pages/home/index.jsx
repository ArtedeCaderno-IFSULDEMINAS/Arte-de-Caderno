import { useEffect } from "react";
import HomeView from "../../views/home";

const Home = () => {
  useEffect(() => {
    document.title = "Arte de Caderno";
  }, []);
  return <HomeView/>
};

export default Home;
