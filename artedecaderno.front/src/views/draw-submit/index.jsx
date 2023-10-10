import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Navbar from "src/components/navbar";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { professorRoutes } from "src/services/professorRoutes";
import { studentRoutes } from "src/services/studentRoutes";
import { colors } from "src/styles/constants";
import {
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
  Title,
} from "src/styles/sharedStyles";

const DrawSubmitView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [draw, setDraw] = useState({
    title: "",
    author: "",
    theme: "",
    category: "",
    file: "",
  });
  const [user, setUser] = useState();
  const [students, setStudents] = useState(null);
  const studentsArray = [];

  const access = Cookies.get("accessType");
  const id = Cookies.get("user");

  const filterStudent = (inputValue) => {
    return studentsArray.filter((student) => {
      student.label.toLowerCase().includes(inputValue.toLowerCase());
    });
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterStudent(inputValue));
    }, 1000);
  };

  const getProfStudents = async () => {
    const a = await professorRoutes.getStudents(id);
    if (a) {
      setStudents(a);
      students.forEach((student) => {
        studentsArray.push({
          value: student._id,
          label: student.name,
        });
      });
    }
  };

  const getProfessor = async () => {
    const a = await professorRoutes.getProfById(id);
    if (a) {
      console.log(a.user);
      setUser(a.user.name);
      getProfStudents();
    }
  };

  const getStudent = async () => {
    const a = await studentRoutes.getUserById(id);
    if (a) {
      console.log(a.user);
      setUser(a.user.name);
    }
  };

  useEffect(() => {
    if (access === "professor") {
      getProfessor();
    } else {
      getStudent();
    }
  }, []);

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <Title color={"black"}>Cadastrar Obra</Title>
        <Container width={desktop ? "60%" : "90%"} color={colors.lightGrey}>
          <Form>
            <Row>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Título:</Label>
                <Input value={draw.title} />
              </InputColumn>
              {access === "professor" && (
                <InputColumn width={desktop ? "50%" : "100%"}>
                  <Label>Autor:</Label>
                  <Input value={draw.title} />
                </InputColumn>
              )}
              {access === "student" && (
                <InputColumn width={desktop ? "50%" : "100%"}>
                  <Label>Autor:</Label>
                  <Input value={user} disabled />
                </InputColumn>
              )}
              {access === "professor" && (
                <InputColumn width={desktop ? "50%" : "100%"}>
                  <Label>Estudante:</Label>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                  />
                </InputColumn>
              )}
            </Row>
            <Row>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Tema:</Label>
                <Select value={draw.theme}>
                  <Option selected disabled value="">
                    Selecione...
                  </Option>
                  {/* TODO: Pegar os temas do banco */}
                  <Option value="Tema1">Tema 1</Option>
                  <Option value="Tema2">Tema 2</Option>
                  <Option value="Tema3">Tema 3</Option>
                </Select>
              </InputColumn>
            </Row>
          </Form>
        </Container>
      </ContentContainer>
    </PageContainer>
  );
};

export default DrawSubmitView;
