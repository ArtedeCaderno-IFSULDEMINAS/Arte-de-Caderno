import { useState } from "react";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { CPFroutes } from "src/services/CPFroutes";
import { colors } from "src/styles/constants";
import Layout from "src/styles/layout";
import {
  Container,
  Form,
  Input,
  InputColumn,
  Label,
  Row,
  Title
} from "src/styles/sharedStyles";
import { format } from "src/utils/format";

const InsertEvaluatorView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [aux, setAux] = useState(null);
  const [evaluator, setEvaluator] = useState({
    name: null,
    date_of_birth: null,
    email: null,
    password: null,
    cpf: null,
  });

  const handleChange = (e) => {
    setEvaluator({
      ...evaluator,
      [e.target.name]: e.target.value,
    });
  };

  const handleCpf = (e) => {
    const { value } = e.target;
    setAux((aux) => ({
      ...aux,
      cpf: format.cpf(value),
    }));
  };

  const checkCpf = async () => {
    const a = await CPFroutes.verifyCPF(aux.cpf);
    if (!a) {
      return;
    } else {
      setEvaluator((user) => ({ ...user, cpf: aux.cpf }));
    }
  };

  return (
    <Layout>
      <>
        <Title color="black">Cadastrar avaliador</Title>
        <Container width={desktop ? "60%" : "90%"} color={colors.lightGrey}>
          <Form>
            <Row>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Nome</Label>
                <Input
                  value={evaluator.name}
                  name="name"
                  onChange={handleChange}
                  required
                />
              </InputColumn>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Data de nascimento</Label>
                <Input
                  value={evaluator.date_of_birth}
                  name="date_of_birth"
                  onChange={handleChange}
                  type="date"
                  required
                />
              </InputColumn>
            </Row>
            <Row>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>CPF</Label>
                <Input
                  required
                  name="cpf"
                  onChange={handleCpf}
                  value={aux.cpf}
                  onBlur={checkCpf}
                />
              </InputColumn>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Senha</Label>
                <Input
                  value={evaluator.password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  required
                />
              </InputColumn>
            </Row>
          </Form>
        </Container>
      </>
    </Layout>
  );
};

export default InsertEvaluatorView;
