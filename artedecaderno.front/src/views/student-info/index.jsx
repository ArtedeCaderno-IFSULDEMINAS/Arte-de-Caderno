import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "src/components/loading";
import PreviousArrow from "src/components/previous-arrow";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { schoolRoutes } from "src/services/schoolRoutes";
import { studentRoutes } from "src/services/studentRoutes";
import { colors, fonts } from "src/styles/constants";
import { icons } from "src/styles/icons";
import Layout from "src/styles/layout";
import {
  Container,
  Row,
  Text,
  Title
} from "src/styles/sharedStyles";
import { format } from "src/utils/format";

const StudentInfoView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const id = useParams().id;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [draws, setDraws] = useState([]);
  const [flag, setFlag] = useState(false);

  const getSchool = async () => {
    const a = await schoolRoutes.getSchoolById(data.schoolId);
    if (a) {
      setData((data) => {
        return { ...data, school: a.name };
      });
    }
  };

  const getDraws = async () => {
    const a = await studentRoutes.getDrawsByStudent(id);
    if (a) {
      setDraws(a);
      setFlag(true);
    }
  };

  const getStudent = async () => {
    const a = await studentRoutes.getUserById(id);
    if (a) {
      setData(a.user);
      await getSchool();
      await getDraws();
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getStudent();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <Title color={"black"} font={fonts.league}>
          Informações do Aluno:
        </Title>
        <Row width={desktop ? "80%" : "90%"}>
          <Container color={colors.lightGrey} width={desktop ? "80%" : "100%"}>
            <Row style={{ justifyContent: "flex-start" }}>
              <Text style={{ fontWeight: 600, textTransform: "uppercase" }}>
                Nome Completo:
              </Text>
              <Text>{data.name}</Text>
            </Row>
            <Row style={{ justifyContent: "flex-start" }}>
              <Text style={{ fontWeight: 600, textTransform: "uppercase" }}>
                Data de Nascimento:
              </Text>
              <Text>
                {new Date(data.date_of_birth).toLocaleDateString("pt-BR")}
              </Text>
            </Row>
            <Row style={{ justifyContent: "flex-start" }}>
              <Text style={{ fontWeight: 600, textTransform: "uppercase" }}>
                CPF:
              </Text>
              <Text>{format.cpf(data.cpf)}</Text>
            </Row>
            <Row style={{ justifyContent: "flex-start" }}>
              <Text style={{ fontWeight: 600, textTransform: "uppercase" }}>
                Telefone:
              </Text>
              <Text>{format.cel(data.phone)}</Text>
            </Row>
            <Row style={{ justifyContent: "flex-start" }}>
              <Text style={{ fontWeight: 600, textTransform: "uppercase" }}>
                e-mail:
              </Text>
              <Text>{data.email}</Text>
            </Row>
            <Row style={{ justifyContent: "flex-start" }}>
              <Text style={{ fontWeight: 600, textTransform: "uppercase" }}>
                CEP:
              </Text>
              <Text>{format.cep(data.cep)}</Text>
            </Row>
            <Row style={{ justifyContent: "flex-start" }}>
              <Text style={{ fontWeight: 600, textTransform: "uppercase" }}>
                Cidade:
              </Text>
              <Text>{data.city}</Text>
            </Row>
            <Row style={{ justifyContent: "flex-start" }}>
              <Text style={{ fontWeight: 600, textTransform: "uppercase" }}>
                Estado:
              </Text>
              <Text>{data.uf}</Text>
            </Row>
            <Row style={{ justifyContent: "flex-start" }}>
              <Text style={{ fontWeight: 600, textTransform: "uppercase" }}>
                escola:
              </Text>
              <Text>{data.school}</Text>
            </Row>
          </Container>
          <Row>
            {flag && (
              <Row>
                {draws.map((draw, index) => {
                  return (
                    <img
                      src={
                        require(`../../../../desenhos/${draw.linkImage}`) ||
                        draw.linkImage
                      }
                      alt={draw.title}
                      key={index}
                      height={"200px"}
                    />
                  );
                })}
              </Row>
            )}

            {!flag && (
              <Text>
                Nenhuma obra encontrada...{" "}
                <FontAwesomeIcon icon={icons.cancel} />{" "}
              </Text>
            )}
          </Row>
        </Row>
        <PreviousArrow
          width={desktop ? "80%" : "90%"}
          navigate={"/meus-alunos"}
        />
      </Layout>
    );
  }
};

export default StudentInfoView;
