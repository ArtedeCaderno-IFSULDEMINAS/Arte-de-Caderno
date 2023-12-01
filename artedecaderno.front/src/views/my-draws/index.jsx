import Cookies from "js-cookie";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "src/components/loading";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { studentRoutes } from "src/services/studentRoutes";
import { colors, fonts } from "src/styles/constants";
import Layout from "src/styles/layout";
import { Button, Container, Row, Text, Title } from "src/styles/sharedStyles";

const MyDrawsView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [loading, setLoading] = useState(true);
  const [draws, setDraws] = useState([]);

  const navigate = useNavigate()

  const getStudentDraws = async () => {
    const a = await studentRoutes.getDrawsByStudent(Cookies.get("user"));
    if (a) {
      setDraws(a);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getStudentDraws();
  }, [loading]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <Title color="black">Meus Desenhos</Title>
        <Container width={desktop ? "60%" : "90%"} color={colors.lightGrey}>
          {draws.length <= 0 && (
            <>
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
            </>
          )}

        {draws.length > 0 && (
            <>
                tem desenho {draws.length}
            </>
        )}

        </Container>
      </Layout>
    );
  }
};

export default MyDrawsView;
