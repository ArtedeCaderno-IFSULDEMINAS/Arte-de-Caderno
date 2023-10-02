import { useEffect } from "react";
import GalleryView from "src/views/gallery";

const Gallery = () => {
  useEffect(() => {
    document.title = "Arte de Caderno | Galeria";
  }, []);
  return <GalleryView/>
};

export default Gallery;
