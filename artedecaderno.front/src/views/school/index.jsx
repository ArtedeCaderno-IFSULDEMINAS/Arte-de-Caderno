import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "src/components/loading";
import Navbar from "src/components/navbar";
import PreviousArrow from "src/components/previous-arrow";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { schoolRoutes } from "src/services/schoolRoutes";
import { colors } from "src/styles/constants";
import {
  Container,
  ContentContainer,
  PageContainer,
  Text,
  Title
} from "src/styles/sharedStyles";
import { format } from "src/utils/format";

const SchoolView = () => {
  const { id } = useParams();
  const desktop = useMediaQuery("(min-width: 768px)");
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState(null);

  const getSchool = async () => {
    const a = await schoolRoutes.getSchoolById(id);
    if (a) {
      setSchool(a);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getSchool();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <Title color="black">Informações da Escola</Title>
          <Container
            color={colors.lightGrey}
            width={desktop ? "70%" : "90%"}
            style={{ alignItems: "flex-start", gap: "0.5rem" }}
          >
            <Text style={{ fontWeight: 600, display: "flex", gap: "10px" }}>
              Nome: <Text style={{ fontWeight: 400 }}>{school.name}</Text>
            </Text>
            <Text style={{ fontWeight: 600, display: "flex", gap: "10px" }}>
              Telefone:{" "}
              <Text style={{ fontWeight: 400 }}>
                {format.phone(school.phone)}
              </Text>
            </Text>
            <Text style={{ fontWeight: 600, display: "flex", gap: "10px" }}>
              CEP:{" "}
              <Text style={{ fontWeight: 400 }}>{format.cep(school.cep)}</Text>
            </Text>
            <Text style={{ fontWeight: 600, display: "flex", gap: "10px" }}>
              Endereço:{" "}
              <Text style={{ fontWeight: 400 }}>{school.address}</Text>
            </Text>
            <Text style={{ fontWeight: 600, display: "flex", gap: "10px" }}>
              Cidade: <Text style={{ fontWeight: 400 }}>{school.city}</Text>
            </Text>
            <Text style={{ fontWeight: 600, display: "flex", gap: "10px" }}>
              UF: <Text style={{ fontWeight: 400 }}>{school.uf}</Text>
            </Text>
            <Text style={{ fontWeight: 600, display: "flex", gap: "10px" }}>
              E-mail: <Text style={{ fontWeight: 400 }}>{school.email}</Text>
            </Text>
            {school.site && (
              <Text style={{ fontWeight: 600, display: "flex", gap: "10px" }}>
                Site:{" "}
                <a
                  href={school.site}
                  target="_blank"
                  style={{ fontWeight: 400, color: "black" }}
                >
                  {school.site}
                </a>
              </Text>
            )}
          </Container>
          <PreviousArrow width={desktop ? "70%" : "90%"} />
        </ContentContainer>
      </PageContainer>
    );
  }
};

export default SchoolView;
