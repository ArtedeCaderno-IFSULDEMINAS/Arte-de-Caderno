import { useEffect } from "react";
import NotFoundView from "src/views/not-found";

const NotFound = () => {

  useEffect(() => {
    document.title= "Arte de Caderno | 404"
  }, []);

  return <NotFoundView />;
};

export default NotFound;
