import { Banner } from "src/components/banner";
import PreviousArrow from "src/components/previous-arrow";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import Layout from "src/styles/layout";
import {
  Column,
  Container,
  Row,
  Text,
  Title
} from "src/styles/sharedStyles";
import { passwordTips } from "src/utils/password-tips";

const PasswordTip = () => {
  const desktop = useMediaQuery("(min-width: 768px)");

  return (
    <Layout>
      <Banner img={require("src/assets/img/login/background.png")}>
        <Column style={{ gap: "1rem" }}>
          <Container width={desktop ? "60%" : "90%"}>
            <Title color="black">Dicas de segurança</Title>
            {passwordTips.map((tip, index) => (
              <Row
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontWeight: 600 }} align="left">
                  {index + 1}. {tip.title}:
                  <Text align="left" style={{ fontWeight: 400 }}>
                    {tip.description}
                  </Text>
                </Text>
              </Row>
            ))}
          </Container>
          <PreviousArrow width={desktop ? "60%" : "90%"} />
        </Column>
      </Banner>
    </Layout>
  );
};

export default PasswordTip;
