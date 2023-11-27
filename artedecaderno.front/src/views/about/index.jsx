import { Banner } from "src/components/banner";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { Container, Column } from "src/styles/sharedStyles";
import { useState } from "react";
import AboutText from "./components/about";
import Layout from "src/styles/layout";
import { SliderItem, SliderWrapper } from "src/components/slider/components";
import { teammates } from "src/utils/teammates";
import TeamMembers from "./components/team";

const AboutView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [currentPage, setCurrentPage] = useState("about");

  return (
    <Layout currentPage={"Sobre"}>
      <Banner img={require("src/assets/img/about/background.jpg")}>
        <Container width={desktop ? "50%" : "90%"} style={{ gap: "2rem" }}>
          <AboutText desktop={desktop} setCurrentPage={setCurrentPage} />
          <Column>
            <SliderWrapper>
              {teammates.map((teammate, index) => {
                return (
                  <SliderItem key={index} height={"150px"} >
                    <TeamMembers teammate={teammate} />
                  </SliderItem>
                );
              })}
            </SliderWrapper>
          </Column>
        </Container>
      </Banner>
    </Layout>
  );
};

export default AboutView;
