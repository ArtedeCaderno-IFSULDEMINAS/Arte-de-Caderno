import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "src/components/loading";
import PreviousArrow from "src/components/previous-arrow";
import Table from "src/components/table";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { professorRoutes } from "src/services/professorRoutes";
import Layout from "src/styles/layout";
import {
  Title
} from "src/styles/sharedStyles";

const MySchoolsView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSchools = async () => {
    const a = await professorRoutes.getSchools(Cookies.get("user"));
    if (a) {
      setData(a);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <Title color="black">Minhas escolas</Title>
        <Table
          headers={["nº", "nome", "UF", "e-mail", " "]}
          width={desktop ? "80%" : "90%"}
          data={data}
          path={"escola"}
        />
        <PreviousArrow width={desktop ? "80%" : "90%"} />
      </Layout>
    );
  }
};

export default MySchoolsView;
