import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "src/components/loading";
import Navbar from "src/components/navbar";
import { professorRoutes } from "src/services/professorRoutes";
import {
  ContentContainer,
  PageContainer,
  Title
} from "src/styles/sharedStyles";

const StudentsView = () => {
  const id = Cookies.get("user");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(null);

  const getStudents = async () => {
    const a = professorRoutes.getStudents(id);
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
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <Title color="black">Alunos Cadastrados</Title>
        </ContentContainer>
      </PageContainer>
    );
  }
};

export default StudentsView;
