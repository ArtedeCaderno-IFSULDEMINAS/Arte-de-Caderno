import { Column, Row, Title } from "src/styles/sharedStyles";
import { teammates } from "src/utils/teammates";
import TeamMembers from "../about/components/team";

const TeamText = ({ desktop }) => {
  return (
    <>
      <Column width={"100%"} style={{ gap: "1rem" }}>
        <Title color="black">Nossa Equipe</Title>
        <Row width={"100%"} gap={"1rem"} style={{ flexWrap: "wrap" }}>
          {teammates.map((teammate, index) => {
            return <TeamMembers teammate={teammate} key={index} />;
          })}
        </Row>
      </Column>
    </>
  );
};

export default TeamText;
