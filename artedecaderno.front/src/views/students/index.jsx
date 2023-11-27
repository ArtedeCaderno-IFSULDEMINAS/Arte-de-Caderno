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

const StudentsView = () => {
  const id = Cookies.get("user");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(null);

  const desktop = useMediaQuery("(min-width: 768px)");

  const getStudents = async () => {
    const a = await professorRoutes.getStudents(id);
    console.log(a);
    if (a) {
      setStudents(a);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <Title color="black">Alunos Cadastrados</Title>
        <Table
          headers={["nº", "nome", "estado", "e-mail", " "]}
          data={students}
          width={desktop ? "80%" : "90%"}
          path={"aluno"}
        />
        <PreviousArrow
          navigate={"/dashboard"}
          width={desktop ? "80%" : "90%"}
        />
      </Layout>
    );
  }
};

export default StudentsView;
