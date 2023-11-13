import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate} from "react-router-dom";
import Loading from "src/components/loading";
import Navbar from "src/components/navbar";
import PreviousArrow from "src/components/previous-arrow";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { CEProutes } from "src/services/CEProutes";
import { CPFroutes } from "src/services/CPFroutes";
import { professorRoutes } from "src/services/professorRoutes";
import { colors } from "src/styles/constants";
import {
  Button,
  Column,
  Container,
  ContentContainer,
  Form,
  Input,
  InputColumn,
  Label,
  Option,
  PageContainer,
  Row,
  Select,
  Title
} from "src/styles/sharedStyles";
import { format } from "src/utils/format";
import { throwToast } from "src/utils/toast";

const CheckupStudentView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [student, setStudent] = useState({
    nome: null,
    cpf: null,
    cep: null,
    city: null,
    uf: null,
    date_of_birth: null,
    cel: null,
    email: null,
    rua: null,
    number: null,
    bairro: null,
    complemento: null,
    schoolId: null,
  });
  const [desabilitado, setDesabilitado] = useState({ rua: true, number: true });
  const [aux, setAux] = useState({ cpf: null });
  const [loading, setLoading] = useState(true);
  const [schools, setSchools] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const getSchools = async () => {
    const a = await professorRoutes.getSchools(Cookies.get("user"));
    if (a) {
      setSchools(a);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  const handleCpf = (e) => {
    const { value } = e.target;
    setAux((aux) => ({
      ...aux,
      cpf: format.cpf(value),
    }));
  };

  const handleCel = (e) => {
    const { value } = e.target;
    setStudent((student) => ({
      ...student,
      cel: format.cel(value),
    }));
  };

  const handleCep = (e) => {
    const { value } = e.target;
    setStudent((student) => ({
      ...student,
      cep: format.cep(value),
    }));
  };

  const getCep = async () => {
    const a = await CEProutes.viacep(student.cep);
    if (a) {
      if (!a.logradouro || !a.bairro) {
        setDesabilitado((desabilitado) => ({
          ...desabilitado,
          bairro: false,
          number: false,
        }));
        setStudent((student) => ({
          ...student,
          cep: a.cep,
          city: a.localidade,
          uf: a.uf,
          bairro: "",
          rua: "",
        }));
      } else {
        setDesabilitado((desabilitado) => ({
          ...desabilitado,
          bairro: true,
          number: false,
        }));
        setStudent((student) => ({
          ...student,
          cep: a.cep,
          rua: a.logradouro,
          bairro: a.bairro,
          city: a.localidade,
          uf: a.uf,
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((student) => ({
      ...student,
      [name]: value,
    }));
  };

  const checkCpf = async () => {
    const a = await CPFroutes.verifyCPF(aux.cpf);
    if (!a) {
      setAux({ ...aux, cpf: null });
      return;
    } else {
      setStudent((student) => ({ ...student, cpf: aux.cpf }));
    }
  };

  const insertStudent = async () => {
    const a = professorRoutes.insertStudent(student, Cookies.get("user"));

    if (a) {
      throwToast.success("Aluno cadastrado com sucesso!");
      setRedirect(true);
    } else {
      throwToast.error("Erro ao cadastrar aluno!");
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <PageContainer style={{marginTop: desktop ? "" : "1rem"}} >
        <Navbar />
        {redirect && <Navigate to="/dashboard" replace />}
        <ContentContainer>
          <Title color={"black"}>Cadastrar Estudante</Title>
          <Column width={desktop ? "60%" : "90%"} style={{ gap: "1rem" }}>
            <Container color={colors.lightGrey}>
              <Form onSubmit={insertStudent}>
                <Row>
                  <InputColumn width={desktop ? "60%" : "100%"}>
                    <Label>Nome completo:</Label>
                    <Input
                      required
                      value={student.nome}
                      onChange={handleChange}
                      name="nome"
                    />
                  </InputColumn>
                  <InputColumn width={desktop ? "20%" : "100%"}>
                    <Label>Data de Nascimento:</Label>
                    <Input
                      type="date"
                      value={student.date_of_birth}
                      name="date_of_birth"
                      onChange={handleChange}
                    />
                  </InputColumn>
                  <InputColumn width={desktop ? "20%" : "100%"}>
                    <Label>CPF:</Label>
                    <Input
                      required
                      name="cpf"
                      onChange={handleCpf}
                      value={aux.cpf}
                      onBlur={checkCpf}
                    />
                  </InputColumn>
                </Row>
                <Row>
                  <InputColumn width={desktop ? "15%" : "100%"}>
                    <Label>CEP:</Label>
                    <Input
                      value={student.cep}
                      onChange={handleCep}
                      required
                      onBlur={getCep}
                    />
                  </InputColumn>
                  <InputColumn width={desktop ? "70%" : "100%"}>
                    <Label>Rua:</Label>
                    <Input
                      value={student.rua}
                      required
                      disabled={desabilitado.rua}
                      name="rua"
                      onChange={handleChange}
                    />
                  </InputColumn>
                  <InputColumn width={desktop ? "15%" : "100%"}>
                    <Label>Número:</Label>
                    <Input
                      required
                      disabled={desabilitado.number}
                      value={student.number}
                      name="number"
                      onChange={handleChange}
                    />
                  </InputColumn>
                </Row>
                <Row>
                  <InputColumn width={desktop ? "20%" : "100%"}>
                    <Label>Complemento:</Label>
                    <Input
                      value={student.complemento}
                      name="complemento"
                      onChange={handleChange}
                      disabled={desabilitado.number}
                    />
                  </InputColumn>
                  <InputColumn width={desktop ? "30%" : "100%"}>
                    <Label>Bairro:</Label>
                    <Input
                      value={student.bairro}
                      required
                      disabled={desabilitado.rua}
                      name="bairro"
                      onChange={handleChange}
                    />
                  </InputColumn>
                  <InputColumn width={desktop ? "50%" : "100%"}>
                    <Label>Cidade:</Label>
                    <Input value={student.city} required disabled />
                  </InputColumn>
                </Row>
                <Row>
                  <InputColumn width={desktop ? "10%" : "100%"}>
                    <Label>Estado:</Label>
                    <Input value={student.uf} required disabled />
                  </InputColumn>
                  <InputColumn width={desktop ? "30%" : "100%"}>
                    <Label>Celular:</Label>
                    <Input
                      value={student.cel}
                      required
                      name="cel"
                      onChange={handleCel}
                    />
                  </InputColumn>
                  <InputColumn width={desktop ? "60%" : "100%"}>
                    <Label>Email:</Label>
                    <Input
                      value={student.email}
                      required
                      name="email"
                      onChange={handleChange}
                      type="email"
                    />
                  </InputColumn>
                </Row>
                <Row>
                  <InputColumn>
                    <Label>Escola:</Label>

                    <Select
                      name="schoolId"
                      value={student.schoolId}
                      onChange={handleChange}
                      defaultValue=""
                    >
                      <Option value="">Selecione...</Option>
                      {schools.map((school) => {
                        return (
                          <Option key={school._id} value={school._id}>
                            {school.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </InputColumn>
                </Row>
                <Button type="submit">cadastrar</Button>
              </Form>
            </Container>
            <PreviousArrow navigate={"/dashboard"} />
          </Column>
        </ContentContainer>
      </PageContainer>
    );
  }
};

export default CheckupStudentView;
