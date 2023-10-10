import { Banner } from "src/components/banner";
import Navbar from "src/components/navbar";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import {
  Container,
  ContentContainer,
  PageContainer,
  BodyLink,
} from "src/styles/sharedStyles";
import Footer from "src/components/footer";
import { useState } from "react";
import AboutText from "./components/about";
import TeamText from "../team";

const AboutView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [currentPage, setCurrentPage] = useState("about");

  return (
    <PageContainer>
      <Navbar currentPage={"Sobre"} />
      <ContentContainer>
        <Banner img={require("src/assets/img/about/background.jpg")}>
          <Container width={desktop ? "50%" : "90%"} style={{ gap: "2rem" }}>
            {currentPage === "about" && (
              <>
                <AboutText desktop={desktop} setCurrentPage={setCurrentPage} />
                <BodyLink onClick={() => setCurrentPage("team")} style={{textDecoration: "underline", opacity: 1}} >
                  Conheça nossa equipe
                </BodyLink>
              </>
            )}

            {currentPage === "team" && (
              <>
                <TeamText desktop={desktop} />
                <BodyLink onClick={() => setCurrentPage("about")}>
                  Voltar
                </BodyLink>
              </>
            )}
          </Container>
        </Banner>
        <Footer />
      </ContentContainer>
    </PageContainer>
  );
};

export default AboutView;
