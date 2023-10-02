import { AlignedColumn } from "./style";
import { Title, Text} from "src/styles/sharedStyles";

const AboutText = (desktop) => {
  return (
    <>
      <AlignedColumn justify={"flex-start"} width={desktop ? "80%" : "100%"}>
        <Title color={"black"}>Sobre o Arte de Caderno</Title>
        <Text align={"left"}>
          É uma ação educativa em formato de concurso, que resgata desenhos
          feitos de forma espontânea, geralmente nas últimas páginas de
          cadernos, provas, agendas, entre outros.
        </Text>
        <Text align={"left"}>
          Com essa ação, além de resgatar e valorizar essa forma de arte,
          pretendemos fomentar a preservação do patrimônio público, incentivando
          a produção de desenhos no suporte correto e não em carteiras, paredes,
          portas e outros.
        </Text>
      </AlignedColumn>
      <AlignedColumn justify={"flex-end"} width={desktop ? "80%" : "100%"}>
        <Title color="black">O IFSULDEMINAS</Title>
        <Text align={"right"}>
          O Instituto Federal de Educação, Ciência e Tecnologia do Sul de Minas
          Gerais conta hoje com 6 unidades, oferecendo ensino gratuito e de
          qualidade para a população sul-mineira. Confira abaixo:
        </Text>
        <img
          src={require("src/assets/img/about/mapa IFSULDEMINAS.png")}
          height={"100%"}
          width={"100%"}
        />
        <Text align={"right"}>
          Hoje, o Arte de Caderno é apoiado pelo <i>campus</i> Poços de Caldas,
          onde promove o acesso a expressões artísticas por meio do Laboratório
          de Criatividade VOA, sediado dentro da instituição.
          <br />O laboratório oferece cursos variados para a população, como
          pintura em tela, corte e costura, fotografia, e outras manifestações
          artísticas.
        </Text>
      </AlignedColumn>
      <AlignedColumn justify={"flex-start"} width={desktop ? "80%" : "100%"}>
        <Title color={"black"}>Alunos X Desenhos</Title>
        <Text align={"left"}>
          A premiação é composta por produtos criados e estampados com as
          imagens captadas e tratadas no próprio projeto. Desta forma, visa
          também oferecer aos alunos vivências e experimentações para a
          construção de conhecimentos em artes, marketing, empreendedorismo, e
          muitos outros.
        </Text>
      </AlignedColumn>

    </>
  );
};

export default AboutText;
