import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreviousArrow from "src/components/previous-arrow";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { CEProutes } from "src/services/CEProutes";
import { professorRoutes } from "src/services/professorRoutes";
import { studentRoutes } from "src/services/studentRoutes";
import { colors } from "src/styles/constants";
import { icons } from "src/styles/icons";
import Layout from "src/styles/layout";
import {
  Button,
  Column,
  Container,
  Form,
  Input,
  InputColumn,
  Label,
  Row,
  Title
} from "src/styles/sharedStyles";
import { format } from "src/utils/format";
import { throwToast } from "src/utils/toast";

const EditProfileView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [showData, setShowData] = useState(false);
  const [desabilitado, setDesabilitado] = useState({ rua: true, number: true });
  const [newUser, setNewUser] = useState({
    nome: null,
    cep: null,
    rua: null,
    numero: null,
    complemento: null,
    bairro: null,
    cidade: null,
    uf: null,
    email: null,
    escola: null,
    cel: null,
    date_of_birth: null,
    schoolId: [null],
  });
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const access = Cookies.get("accessType");
  const id = Cookies.get("user");

  const getProfessor = async () => {
    const a = await professorRoutes.getProfById(id);
    if (a) {
      setUser({
        ...user,
        id: a.user._id,
        name: a.user.name,
        date_of_birth: new Date(a.user.date_of_birth).toLocaleDateString(
          "pt-BR"
        ),
        cpf: a.user.cpf,
        email: a.user.email,
        password: a.user.password,
        cel: a.user.phone,
        cep: a.user.cep,
        city: a.user.city,
        state: a.user.state,
        schoolId: a.user.schoolId,
        studentsId: a.user.studentsId || null,
        drawsId: a.user.drawsId,
      });
    }
  };

  const getStudent = async () => {
    const a = await studentRoutes.getUserById(id);
    if (a) {
      setUser({
        ...user,
        id: a.user._id,
        name: a.user.name,
        date_of_birth: new Date(a.user.date_of_birth).toLocaleDateString(
          "pt-BR"
        ),
        cpf: a.user.cpf,
        email: a.user.email,
        password: a.user.password,
        cel: a.user.phone,
        cep: a.user.cep,
        city: a.user.city,
        uf: a.user.uf,
        schoolId: a.user.schoolId,
        studentsId: a.user.studentsId || null,
        drawsId: a.user.drawsId,
        address: a.user.address,
      });
    }
  };

  useEffect(() => {
    if (access === "professor") {
      getProfessor();
    } else {
      getStudent();
    }
  }, []);

  const handleCep = (e) => {
    setNewUser({ ...newUser, cep: format.cep(e.target.value) });
  };

  const handleCel = (e) => {
    setNewUser({ ...newUser, cel: format.cel(e.target.value) });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const getCep = async () => {
    const a = await CEProutes.viacep(newUser.cep);
    if (a) {
      if (!a.logradouro || !a.bairro) {
        setDesabilitado((desabilitado) => ({
          ...desabilitado,
          bairro: false,
          number: false,
        }));
        setNewUser((user) => ({
          ...user,
          cep: a.cep,
          cidade: a.localidade,
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
        setNewUser((user) => ({
          ...user,
          cep: a.cep,
          rua: a.logradouro,
          bairro: a.bairro,
          cidade: a.localidade,
          uf: a.uf,
        }));
      }
      setShowData(true);
    }
  };

  const updateProf = async () => {
    const updated = {
      name: newUser?.nome || user.name,
      email: newUser?.email || user.email,
      phone: newUser?.cel || user.cel,
      cep: newUser?.cep || user.cep,
      city: newUser?.cidade || user.city,
      uf: newUser?.uf || user.state,
      schoolId: user.schoolId,
      cpf: user.cpf,
      bairro: newUser?.bairro || user.bairro,
      rua: newUser?.rua || user.rua,
      numero: newUser?.numero || user.numero,
      complemento: newUser?.complemento || user?.complemento,
      id: user.id,
    };
    const a = await professorRoutes.updateProfile(updated);
    if (a) {
      throwToast.success("Perfil atualizado com sucesso!");
      navigate("/perfil");
    }
  };

  const updateStudent = async () => {};

  const postUpdate = (e) => {
    e.preventDefault();
    if (access === "professor") {
      updateProf();
    } else if (access === "student") {
      updateStudent();
    }
  };

  return (
    <Layout>
      <Column style={{ gap: "1rem" }}>
        <Title color="black">Editar Perfil</Title>
        <Container color={colors.lightGrey} width={desktop ? "60%" : "90%"}>
          <Form onSubmit={postUpdate}>
            <Row>
              <InputColumn width={desktop ? "80%" : "100%"}>
                <Label>Nome:</Label>
                <Input
                  name="nome"
                  value={newUser.nome}
                  onChange={handleChange}
                />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>CEP:</Label>
                <Row style={{ flexDirection: "row" }}>
                  <Input value={newUser.cep} onChange={handleCep} />
                  <Button type="button" width={"auto"} onClick={getCep}>
                    <FontAwesomeIcon icon={icons.cep} />
                  </Button>
                </Row>
              </InputColumn>
            </Row>
            {showData && (
              <>
                <Row>
                  <InputColumn width={desktop ? "60%" : "100%"}>
                    <Label>Rua:</Label>
                    <Input
                      value={newUser.rua}
                      name="rua"
                      disabled={desabilitado.rua}
                      onChange={handleChange}
                    />
                  </InputColumn>
                  <InputColumn width={desktop ? "20%" : "100%"}>
                    <Label>Número:</Label>
                    <Input
                      value={newUser.numero}
                      name="numero"
                      disabled={desabilitado.number}
                      onChange={handleChange}
                    />
                  </InputColumn>
                  <InputColumn width={desktop ? "20%" : "100%"}>
                    <Label>Complemento:</Label>
                    <Input
                      value={newUser.complemento}
                      disabled={desabilitado.number}
                      name="complemento"
                      onChange={handleChange}
                    />
                  </InputColumn>
                </Row>
                <Row>
                  <InputColumn width={desktop ? "50%" : "100%"}>
                    <Label>Bairro:</Label>
                    <Input
                      value={newUser.bairro}
                      disabled={desabilitado.rua}
                      name="bairro"
                      onChange={handleChange}
                    />
                  </InputColumn>
                  <InputColumn width={desktop ? "40%" : "100%"}>
                    <Label>Cidade:</Label>
                    <Input value={newUser.cidade} disabled />
                  </InputColumn>
                  <InputColumn width={desktop ? "10%" : "100%"}>
                    <Label>UF:</Label>
                    <Input value={newUser.uf} disabled />
                  </InputColumn>
                </Row>
              </>
            )}
            <Row>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Email:</Label>
                <Input
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
              </InputColumn>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Telefone:</Label>
                <Input value={newUser.cel} onChange={handleCel} />
              </InputColumn>
            </Row>
            <Button style={{ gap: "5px" }}>
              Salvar
              <FontAwesomeIcon icon={icons.save} />
            </Button>
          </Form>
        </Container>
        <PreviousArrow width={desktop ? "60%" : "90%"} />
      </Column>
    </Layout>
  );
};

export default EditProfileView;
