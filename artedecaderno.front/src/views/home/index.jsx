import Navbar from "src/components/navbar";
import {
  Button,
  ContentContainer,
  PageContainer
} from "src/styles/sharedStyles";
import { Link } from "react-router-dom";
import { Banner } from "src/components/banner";
import { BannerCard, BannerTitle } from "./components/banner";

const HomeView = () => {
  return (
    <PageContainer>
      <Navbar currentPage={"Início"} />
      <ContentContainer>
        <Banner img={require("src/assets/img/home/banner.jpg")}>
          <BannerCard>
            <BannerTitle>Galeria</BannerTitle>
            <BannerTitle>de desenhos</BannerTitle>
            <Link to="/galeria" style={{ textDecoration: "none" }}>
              <Button>confira</Button>
            </Link>
          </BannerCard>
        </Banner>
      </ContentContainer>
    </PageContainer>
  );
};

export default HomeView;
