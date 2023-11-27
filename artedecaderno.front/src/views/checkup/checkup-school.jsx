import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PreviousArrow from "src/components/previous-arrow";
import { userContext } from "src/contexts/userContext";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { professorRoutes } from "src/services/professorRoutes";
import { schoolRoutes } from "src/services/schoolRoutes";
import { studentRoutes } from "src/services/studentRoutes";
import { colors } from "src/styles/constants";
import Layout from "src/styles/layout";
import {
  BodyLink,
  Button,
  Column,
  Container,
  Form,
  InputColumn,
  Label,
  Option,
  Row,
  Select,
  Text,
  Title
} from "src/styles/sharedStyles";
import { throwToast } from "src/utils/toast";

const CheckupSchool = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const { user, setUser } = useContext(userContext);
  const [ufs, setUfs] = useState(null);
  const [cities, setCities] = useState(null);
  const [schools, setSchools] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({
    uf: null,
    city: null,
    school: null,
  });

  const getUF = async () => {
    const a = await schoolRoutes.getUfs();
    if (a) {
      setUfs(a);
    } else {
      throwToast.error("Erro ao buscar UFs");
    }
  };

  useEffect(() => {
    getUF();
  }, []);

  const changeUf = (e) => {
    const { value } = e.target;
    console.log(value);
    setSelected((selected) => ({
      ...selected,
      uf: value,
    }));
    getCities(value);
  };

  const getCities = async (uf) => {
    try {
      const a = await schoolRoutes.getCities(uf);
      setCities(a);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getSchools = async () => {
    try {
      const a = await schoolRoutes.getSchools(selected.city);
      console.log(a);
      if (a) {
        setSchools(a);
        setShow(true);
      }
    } catch (e) {
      throwToast.error("Ocorreu um erro. Tente novamente mais tarde!");
    }
  };

  const changeCity = (e) => {
    const { value } = e.target;
    setSelected((selected) => ({
      ...selected,
      city: value,
    }));
  };

  const postProf = async () => {
    const a = professorRoutes.insertProfessor(user, selected.school);
    setRedirect(a);
  };

  const postStudent = async () => {
    const a = studentRoutes.insertStudent(user, selected.school.trim());
    setRedirect(a);
  };

  const changeSchool = (e) => {
    const { value } = e.target;
    setSelected((selected) => ({
      ...selected,
      school: value,
    }));
  };

  const POST = (e) => {
    e.preventDefault();
    setUser((user) => ({
      ...user,
      schoolId: selected.school,
    }));
    console.log(user);
    if (user.perfil === "professor") {
      postProf();
    } else {
      postStudent();
    }
  };

  return (
    <Layout>
      {redirect && <Navigate to="/login" replace />}
      <Column style={{ gap: "1rem" }}>
        <Title color={"black"} style={{ fontWeight: 500 }}>
          Cadastro de Usuário
        </Title>
        <Container width={desktop ? "60%" : "90%"} color={colors.grey}>
          <Text>Dados Escolares</Text>
          <Form onSubmit={POST}>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>UF:</Label>
                <Select name="escola" onChange={changeUf}>
                  {ufs === null && (
                    <Option value="" selected>
                      Carregando...
                    </Option>
                  )}
                  <Option value="" selected disabled>
                    {" "}
                    Selecione...
                  </Option>
                  {ufs &&
                    ufs.map((uf, index) => {
                      return (
                        <Option key={`option-${index}`} value={uf}>
                          {uf}
                        </Option>
                      );
                    })}
                  )
                </Select>
              </InputColumn>
              <InputColumn width={desktop ? "80%" : "100%"}>
                <Label>Cidade:</Label>
                <Row style={{ flexDirection: "row" }}>
                  <Select
                    onChange={changeCity}
                    disabled={selected.uf !== null ? false : true}
                  >
                    <Option selected disabled value="">
                      Selecione...
                    </Option>
                    {cities &&
                      cities.map((city, i) => {
                        return (
                          <Option value={city} key={i}>
                            {city}
                          </Option>
                        );
                      })}
                  </Select>
                  <Button type="button" onClick={getSchools}>
                    filtrar
                  </Button>
                </Row>
              </InputColumn>
            </Row>
            <InputColumn>
              <Label>Escola:</Label>
              <Select
                value={selected.school}
                onChange={changeSchool}
                disabled={!show}
              >
                {!show && (
                  <Option selected disabled>
                    Aguardando filtro
                  </Option>
                )}

                {schools !== null && show && (
                  <Option selected>Selecione...</Option>
                )}

                {schools !== null && Array.isArray(schools)
                  ? schools.map((school, index) => {
                      <Option selected>Selecione...</Option>;
                      return (
                        <>
                          <Option key={index} value={school?._id}>
                            {school?.code} | {school?.name}
                          </Option>
                        </>
                      );
                    })
                  : null}
              </Select>
            </InputColumn>
            <Button>cadastrar</Button>
          </Form>
        </Container>
        <Row width={desktop ? "60%" : "90%"}>
          <PreviousArrow navigate={"/cadastrar"} />
        </Row>
        <Link to="/cadastrar-escola" style={{ textDecorationColor: "black" }}>
          <BodyLink>Não encontro a minha escola</BodyLink>
        </Link>
      </Column>
    </Layout>
  );
};

export default CheckupSchool;
