import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "src/components/loading";
import Navbar from "src/components/navbar";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { professorRoutes } from "src/services/professorRoutes";
import {
  BodyLink,
  Column,
  Container,
  ContentContainer,
  PageContainer,
  Row,
  Title,
} from "src/styles/sharedStyles";
import PreviousArrow from "src/components/previous-arrow";
import { studentRoutes } from "src/services/studentRoutes";
import EditProfileItems from "src/components/edit-profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "src/styles/icons";
import { Navigate } from "react-router-dom";
import { colors } from "src/styles/constants";

const ProfileView = () => {
  const id = Cookies.get("user");
  const access = Cookies.get("accessType");
  const desktop = useMediaQuery("(min-width: 768px)");
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProfessor = async () => {
    const a = await professorRoutes.getProfById(id);
    console.log(a);
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
      setLoading(false);
    }
  };

  const getStudent = async () => {
    const a = await studentRoutes.getUserById(id);
    console.log(a);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (access === "professor") {
      getProfessor();
    } else {
      getStudent();
    }
  }, []);

  if (loading) {
    return <Loading currentPage={"Perfil"} />;
  } else {
    return (
      <PageContainer>
        {edit && <Navigate to="editar" />}
        <Navbar currentPage={"Perfil"} />
        <ContentContainer>
          <Row style={{ justifyContent: "center" }}>
            <Title color="black">Perfil</Title>
            <BodyLink>
              <FontAwesomeIcon icon={icons.pen} onClick={() => setEdit(true)} />
            </BodyLink>
          </Row>
          <Container
            width={desktop ? "80%" : "90%"}
            color={colors.lightGrey}
            style={{ gap: "1rem" }}
          >
            <Column width={desktop ? "50%" : "90%"}>
              <EditProfileItems user={user} />
            </Column>
          </Container>
          <PreviousArrow width={desktop ? "80%" : "90%"} />
        </ContentContainer>
      </PageContainer>
    );
  }
};

export default ProfileView;
