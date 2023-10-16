import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "src/components/loading";
import Navbar from "src/components/navbar";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { professorRoutes } from "src/services/professorRoutes";
import {
  Column,
  ContentContainer,
  PageContainer,
  Row,
  Text,
  Title,
} from "src/styles/sharedStyles";
import PreviousArrow from "src/components/previous-arrow";
import { studentRoutes } from "src/services/studentRoutes";
import { fonts } from "src/styles/constants";
import { format } from "src/utils/format";

let data = [];

const ProfileView = () => {
  const id = Cookies.get("user");
  const access = Cookies.get("accessType");

  const desktop = useMediaQuery("(min-width: 768px)");
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfessor = async () => {
    const a = await professorRoutes.getProfById(id);
    console.log(a);
    if (a) {
      setUser({
        ...user,
        name: a.user.name,
        date_of_birth: a.user.date_of_birth,
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
      data = [
        {
          label: "nome completo",
          value: user.name,
        },
        {
          label: "data de nascimento",
          value: user.date_of_birth,
        },
        {
          label: "cpf",
          value: format.cpf(user.cpf),
        },
        {
          label: "telefone",
          value: user.phone,
        },
        {
          label: "e-mail",
          value: user.email,
        },
        {
          label: "cep",
          value: format.cep(user.cep),
        },
        {
          label: "cidade",
          value: user.city,
        },
        {
          label: "estado",
          value: user.uf,
        },
      ];
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
        date_of_birth: new Date(a.user.date_of_birth).toLocaleDateString('pt-BR'),
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
      });
      data = [
        {
          label: "nome completo",
          value: user.name,
        },
        {
          label: "data de nascimento",
          value: user.date_of_birth,
        },
        {
          label: "cpf",
          value: format.cpf(user.cpf),
        },
        {
          label: "telefone",
          value: user.cel,
        },
        {
          label: "e-mail",
          value: user.email,
        },
        {
          label: "cep",
          value: format.cep(user.cep),
        },
        {
          label: "cidade",
          value: user.city,
        },
        {
          label: "estado",
          value: user.uf,
        },
      ];
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
        <Navbar currentPage={"Perfil"} />
        <ContentContainer>
          <Column style={{ gap: "1rem" }}>
            <Title color="black">Perfil</Title>
            <Column width={desktop ? "50%" : "90%"}>
              {data.map((item, index) => {
                return (
                  <Row
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text
                      size={"20px"}
                      font={fonts.quicksand}
                      style={{ textTransform: "uppercase", fontWeight: 600 }}
                    >
                      {item.label}:
                    </Text>
                    <Text size={"20px"} font={fonts.quicksand}>
                      {item.value}
                    </Text>
                  </Row>
                );
              })}
            </Column>
            <PreviousArrow width={desktop ? "60%" : "90%"} />
          </Column>
        </ContentContainer>
      </PageContainer>
    );
  }
};

export default ProfileView;
