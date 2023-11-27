import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "src/components/loading";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { drawToRate } from "src/mocks/draw-rate";
import { fonts } from "src/styles/constants";
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
  Text,
  Title
} from "src/styles/sharedStyles";
import { throwToast } from "src/utils/toast";

const RateDrawView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState(0);
  //const [draw, setDraw] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value > 100 || value < 0) {
      setRate(value.split("").slice(0, -1).join(""));
    } else {
      setRate(value.replace(/[^0-9]/g, "").replace(/^0+/, ""));
    }
  };

  const send = (e) => {
    e.preventDefault();
    setLoading(true);
    drawToRate.review.push({
      numberOfAlertsEvaluator: 0,
      evaluator: Cookies.get("user"),
      _id: drawToRate._id,
    });

    console.log(drawToRate.review);
    throwToast.success("Avaliação enviada com sucesso!");
    navigate("/dashboard");
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <Title color="black">Avaliar Desenho</Title>
        <Row width={desktop ? "60%" : "90%"}>
          <Column width={desktop ? "40%" : "100%"}>
            <img
              src={require("src/assets/img/gallery/img24.jpg")}
              height={"300px"}
            />
          </Column>
          <Container
            width={desktop ? "60%" : "90%"}
            style={{ gap: "1rem", alignItems: "flex-start" }}
          >
            <Text
              style={{
                fontWeight: 600,
                textTransform: "uppercase",
                display: "flex",
                gap: "10px",
              }}
            >
              Categoria:{" "}
              <Text style={{ fontWeight: 400 }}>{drawToRate.category}</Text>
            </Text>
            <Text
              style={{
                fontWeight: 600,
                textTransform: "uppercase",
                display: "flex",
                gap: "10px",
              }}
            >
              Título:{" "}
              <Text style={{ fontWeight: 400 }}>{drawToRate.title}</Text>
            </Text>
            <Form onSubmit={send}>
              <InputColumn>
                <Label>Faça sua avaliação na faixa de 0 a 100:</Label>
                <Input
                  type="text"
                  name="rate"
                  value={rate}
                  onChange={handleChange}
                  style={{ width: "200px" }}
                />
              </InputColumn>
              <Button type="submit" style={{ alignSelf: "flex-start" }}>
                Enviar
              </Button>
              <Text style={{ fontWeight: 600, display: "flex" }}>
                Atenção:{" "}
                <Text font={fonts.raleway} style={{ fontWeight: 400 }}>
                  a avaliação é feita apenas UMA vez e NÃO pode ser alterada
                </Text>
              </Text>
            </Form>
          </Container>
        </Row>
      </Layout>
    );
  }
};

export default RateDrawView;
