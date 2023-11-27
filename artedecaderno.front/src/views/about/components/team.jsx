import { useMediaQuery } from "src/hooks/useMediaQuery";
import { fonts } from "src/styles/constants";
import { Column, Text } from "src/styles/sharedStyles";

const TeamMembers = ({ teammate }) => {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <Column width={desktop ? "40%" : "50%"} style={{ marginBottom: "1rem" }}>
      <img
        src={require(`src/assets/img/team/${teammate.name}.jpg`)}
        height={"80px"}
        style={{ borderRadius: "50%" }}
      />
      <Text style={{ fontWeight: 300, margin: "10px 0" }} font={fonts.raleway}>
        {teammate.name}
      </Text>
      <Text size={"14px"} font={fonts.raleway}>
        {teammate.role}
      </Text>
    </Column>
  );
};

export default TeamMembers;
