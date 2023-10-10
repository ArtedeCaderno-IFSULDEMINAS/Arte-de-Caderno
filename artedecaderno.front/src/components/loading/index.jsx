import {
  Column,
  ContentContainer,
  PageContainer,
  Row,
  Text,
} from "src/styles/sharedStyles";
import Navbar from "../navbar";
import Letter from "./components/letter";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { LoadingBar } from "./components/styles";

const arte = ["a", "r", "t", "e"];
const de = ["d", "e"];
const caderno = ["c", "a", "d", "e", "r", "n", "o"];

const Loading = (currentPage) => {
  const desktop = useMediaQuery("(min-width: 768px)");

  return (
    <PageContainer>
      <Navbar currentPage={currentPage} />
      <ContentContainer>
        <Column style={{ gap: "1rem" }}>
          <Text>Carregando...</Text>
          <Row
            gap={"0.5rem"}
            width={desktop ? "40%" : "90%"}
            style={{
              flexDirection: "row",
              position: "relative",
              justifyContent: "flex-start",
            }}
          >
            <LoadingBar />
            <Row width={"5px"} /> {/* margem */}
            {arte.map((letter, index) => {
              return <Letter letter={letter} key={index} />;
            })}
            <Row width={"10px"} /> {/* espaçamento entre as palavras */}
            {de.map((letter, index) => {
              return <Letter letter={letter} key={index} />;
            })}
            <Row width={"10px"} /> {/* espaçamento entre as palavras */}
            {caderno.map((letter, index) => {
              return <Letter letter={letter} key={index} />;
            })}
          </Row>
        </Column>
      </ContentContainer>
    </PageContainer>
  );
};

export default Loading;
