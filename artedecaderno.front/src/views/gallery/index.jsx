import Navbar from "src/components/navbar";
import { ContentContainer, PageContainer } from "src/styles/sharedStyles";
import { GalleryContainer } from "./components/styles";
import { draws } from "src/mocks/gallery";
import DrawImg from "./components/draw-img";
import { useEffect, useState } from "react";
import { loadGallery } from "src/services/loadGallery";
import Loading from "src/components/loading";

const GalleryView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const a = loadGallery();
    if (a) {
      setData([...a]);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);
  
  if (loading) {
    return <Loading currentPage={"Galeria"} />;
  } else {
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
  }
};

export default GalleryView;
