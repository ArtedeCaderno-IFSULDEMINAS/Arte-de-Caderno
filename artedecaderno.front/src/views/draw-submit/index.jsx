import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "src/components/loading";
import PreviousArrow from "src/components/previous-arrow";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { drawRoutes } from "src/services/drawRoutes";
import { professorRoutes } from "src/services/professorRoutes";
import { studentRoutes } from "src/services/studentRoutes";
import { colors, fonts } from "src/styles/constants";
import Layout from "src/styles/layout";
import {
  Button,
  Container,
  Form,
  Input,
  InputColumn,
  Label,
  Option,
  Row,
  Select,
  Text,
  Title,
} from "src/styles/sharedStyles";

const DrawSubmitView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [draw, setDraw] = useState({
    title: null,
    author: null,
    theme: null,
    category: null,
    imageUrl: null,
    image: null,
  });
  const [user, setUser] = useState();
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allow, setAllow] = useState(false);

  const access = Cookies.get("accessType");
  const id = Cookies.get("user");

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const imageUrl = URL.createObjectURL(file);
    setDraw((prevState) => ({
      ...prevState,
      imageUrl: imageUrl,
      image: file,
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
      students.forEach((student) => {
        if (student.drawsId.length >= 3) {
          students.pop(student);
        }
      });
    }
  };

  const getProfessor = async () => {
    const a = await professorRoutes.getProfById(id);
    if (a) {
      console.log(a.user);
      setUser(a.user.name);
      getProfStudents();
      setLoading(false);
    }
  };

  const getStudent = async () => {
    const a = await studentRoutes.getUserById(id);
    if (a) {
      console.log(a.user);
      setUser(a.user);
      if (a.user.drawsId.length >= 3) {
        setAllow(false);
        setLoading(false);
      } else {
        setDraw((prevState) => ({
          ...prevState,
          author: a.user._id,
        }));
        setAllow(true);
        setLoading(false);
      }
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
    e.preventDefault();
    console.log(draw);
    setLoading(true);

    const a = await drawRoutes.postDraw(draw);
    if (a) {
      navigate("/dashboard");
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        {allow && (
          <>
            <Title color={"black"}>Cadastrar Obra</Title>
            <Container width={desktop ? "60%" : "90%"} color={colors.lightGrey}>
              <Form onSubmit={insertDraw}>
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
                              <Option value={student._id}>
                                {student.name}
                              </Option>
                            );
                          })}
                      </Select>
                    </InputColumn>
                  )}
                  {access === "student" && (
                    <InputColumn width={desktop ? "50%" : "100%"}>
                      <Label>Autor:</Label>
                      <Input
                        value={user.name}
                        required
                        onChange={handleImageChange}
                        disabled
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
                    {draw.imageUrl && (
                      <img src={draw.imageUrl} height={"150px"} />
                    )}
                  </InputColumn>
                </Row>
                <Button>cadastrar</Button>
              </Form>
            </Container>
          </>
        )}

        {!allow && (
          <>
            <Title color={"black"}>Cadastrar Obra</Title>
            <Container width={desktop ? "60%" : "90%"} color={colors.lightGrey}  >
              <Title color={"black"} style={{ fontSize: "60px" }}>
                Oops!
              </Title>
              <Text font={fonts.raleway} size={"30px"} align={"left"}>
                Parece que você atingiu o limite de obras!
              </Text>
              <Row style={{ marginTop: "1rem" }}>
                <Button
                  width={"auto"}
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  voltar para a dashboard
                </Button>
              </Row>
            </Container>
            <PreviousArrow width={desktop ? "60%" : "90%"} />
          </>
        )}
      </Layout>
    );
  }
};

export default DrawSubmitView;
