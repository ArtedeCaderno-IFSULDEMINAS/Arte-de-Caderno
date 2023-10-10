import Navbar from "src/components/navbar";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { colors } from "src/styles/constants";
import {
  Container,
  ContentContainer,
  Form,
  Input,
  InputColumn,
  Label,
  PageContainer,
  Row,
  Title,
} from "src/styles/sharedStyles";

const CheckupStudentView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <Title color={"black"}>Cadastrar Estudante</Title>
        <Container width={desktop ? "60%" : "90%"} color={colors.lightGrey}>
          <Form>
            <Row>
              <InputColumn width={desktop ? "60%" : "100%"}>
                <Label>Nome completo:</Label>
                <Input />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>Data de Nascimento:</Label>
                <Input />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>CPF:</Label>
                <Input />
              </InputColumn>
            </Row>
            <Row>
              <InputColumn width={desktop ? "15%" : "100%"}>
                <Label>CEP:</Label>
                <Input />
              </InputColumn>
              <InputColumn width={desktop ? "70%" : "100%"}>
                <Label>Rua:</Label>
                <Input />
              </InputColumn>
              <InputColumn width={desktop ? "15%" : "100%"}>
                <Label>Número:</Label>
                <Input />
              </InputColumn>
            </Row>
          </Form>
        </Container>
      </ContentContainer>
    </PageContainer>
  );
};

export default CheckupStudentView;
