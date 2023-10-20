import { Banner } from "src/components/banner";
import Navbar from "src/components/navbar";
import PreviousArrow from "src/components/previous-arrow";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import {
  Column,
  Container,
  ContentContainer,
  Row,
  Text,
  Title,
} from "src/styles/sharedStyles";
import { passwordTips } from "src/utils/password-tips";

const PasswordTip = () => {
  const desktop = useMediaQuery("(min-width: 768px)");

  return (
    <ContentContainer>
      <Navbar />
      <Banner img={require("src/assets/img/login/background.png")}>
        <Column style={{gap: "1rem"}}>
          <Container width={desktop ? "60%" : "90%"}  >
            <Title color="black">Dicas de segurança</Title>
            {passwordTips.map((tip, index) => (
              <Row
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontWeight: 600, width: "auto" }} align="left">
                  {index + 1}. {tip.title}:
                </Text>
                <Text align="left">{tip.description}</Text>
              </Row>
            ))}
          </Container>
          <PreviousArrow width={desktop ? "60%" : "90%"} />
        </Column>
      </Banner>
    </ContentContainer>
  );
};

export default PasswordTip;
