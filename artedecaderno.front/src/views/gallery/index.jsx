import Navbar from "src/components/navbar";
import { ContentContainer, PageContainer } from "src/styles/sharedStyles";
import { GalleryContainer } from "./components/styles";
import { draws } from "src/mocks/gallery";
import DrawImg from "./components/draw-img";

const GalleryView = () => {
  return (
    <PageContainer>
      <Navbar currentPage={"Galeria"} />
      <ContentContainer>
        <GalleryContainer>
          {draws.map((draw, index) => {
            return <DrawImg draw={draw} key={index} />;
          })}
        </GalleryContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default GalleryView;
