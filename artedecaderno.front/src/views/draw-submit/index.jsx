import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "src/components/navbar";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { drawRoutes } from "src/services/drawRoutes";
import { professorRoutes } from "src/services/professorRoutes";
import { studentRoutes } from "src/services/studentRoutes";
import { colors } from "src/styles/constants";
import {
  Button,
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
    title: null,
    author: null,
    theme: null,
    category: null,
    image: null,
  });
  const [user, setUser] = useState();
  const [students, setStudents] = useState(null);

  const access = Cookies.get("accessType");
  const id = Cookies.get("user");

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setDraw((prevState) => ({
      ...prevState,
      image: imageUrl,
    }));
  };

  const handleDraw = (e) => {
    const { name, value } = e.target;
    setDraw((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getProfStudents = async () => {
    const a = await professorRoutes.getStudents(id);
    if (a) {
      setStudents(a);
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

  const insertDraw = async (e) => {
    e.preventDefault()
    const a = await drawRoutes.postDraw(draw);
    if (a) {
      navigate("/dashboard");
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <Title color={"black"}>Cadastrar Obra</Title>
        <Container width={desktop ? "60%" : "90%"} color={colors.lightGrey}>
          <Form onSubmit={insertDraw} >
            <Row>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Título:</Label>
                <Input
                  value={draw.title}
                  required
                  name="title"
                  onChange={handleDraw}
                />
              </InputColumn>
              {access === "professor" && (
                <InputColumn width={desktop ? "50%" : "100%"}>
                  <Label>Autor:</Label>
                  <Select
                    value={draw.author}
                    name="author"
                    required
                    onChange={handleDraw}
                  >
                    <Option selected disabled value="">
                      Selecione...
                    </Option>
                    {students &&
                      students.map((student) => {
                        return (
                          <Option value={student._id}>{student.name}</Option>
                        );
                      })}
                  </Select>
                </InputColumn>
              )}
              {access === "student" && (
                <InputColumn width={desktop ? "50%" : "100%"}>
                  <Label>Autor:</Label>
                  <Input
                    value={draw.title}
                    required
                    onChange={handleImageChange}
                  />
                </InputColumn>
              )}
            </Row>
            <Row>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Tema:</Label>
                <Select
                  value={draw.theme}
                  required
                  name="theme"
                  onChange={handleDraw}
                >
                  <Option selected disabled value="">
                    Selecione...
                  </Option>

                  <Option value="Tema1">Tema 1</Option>
                  <Option value="Tema2">Tema 2</Option>
                  <Option value="Tema3">Tema 3</Option>
                </Select>
              </InputColumn>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Categoria:</Label>
                <Select
                  value={draw.category}
                  name="category"
                  required
                  onChange={handleDraw}
                >
                  <Option selected disabled value="">
                    Selecione...
                  </Option>
                  {/* TODO: Pegar os temas do banco */}
                  <Option value="ninja">Ninja</Option>
                  <Option value="super ninja">Super Ninja</Option>
                </Select>
              </InputColumn>
            </Row>
            <Row>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <input
                  type="file"
                  name="image"
                  id="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImageChange}
                />
              </InputColumn>
              <InputColumn width={desktop ? "50%" : "100%"}>
                {draw.image && <img src={draw.image} height={"150px"} />}
              </InputColumn>
            </Row>
            <Button>cadastrar</Button>
          </Form>
        </Container>
      </ContentContainer>
    </PageContainer>
  );
};

export default DrawSubmitView;
