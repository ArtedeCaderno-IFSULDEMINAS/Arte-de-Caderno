import {
  Button,
} from "src/styles/sharedStyles";
import { Link } from "react-router-dom";
import { Banner } from "src/components/banner";
import { BannerCard, BannerTitle } from "./components/banner";
import Layout from "src/styles/layout";

const HomeView = () => {
  return (
    <Layout currentPage={"Início"}>
      <Banner img={require("src/assets/img/home/banner.jpg")}>
        <BannerCard>
          <BannerTitle>Galeria</BannerTitle>
          <BannerTitle>de desenhos</BannerTitle>
          <Link to="/galeria" style={{ textDecoration: "none" }}>
            <Button>confira</Button>
          </Link>
        </BannerCard>
      </Banner>
    </Layout>
  );
};

export default HomeView;
