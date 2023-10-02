import { useEffect } from "react";
import AboutView from "src/views/about";

const About = () => {
  useEffect(() => {
    document.title = "Arte de Caderno | Sobre";
  }, []);

  return <AboutView />;
};

export default About;
