import { GalleryContainer } from "./components/styles";
import { draws } from "src/mocks/gallery";
import DrawImg from "./components/draw-img";
import { useEffect, useState } from "react";
import { loadGallery } from "src/services/loadGallery";
import Loading from "src/components/loading";
import Layout from "src/styles/layout";

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
      <Layout currentPage={"Galeria"}>
        <>
          <GalleryContainer>
            {draws.map((draw, index) => {
              return <DrawImg draw={draw} key={index} />;
            })}
          </GalleryContainer>
        </>
      </Layout>
    );
  }
};

export default GalleryView;
