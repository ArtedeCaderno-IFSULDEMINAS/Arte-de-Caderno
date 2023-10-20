import { useEffect, useState } from "react";
import { schoolRoutes } from "src/services/schoolRoutes";
import { fonts } from "src/styles/constants";
import { Column, Row, Text } from "src/styles/sharedStyles";
import { format } from "src/utils/format";

const EditProfileItems = ({ user }) => {
  const [school, setSchool] = useState(null);

  const getSchool = async () => {
    const a = await schoolRoutes.getSchoolById(user.schoolId);
    if (a) {
      setSchool(a);
    }
  };

  useEffect(() => {
    getSchool();
  }, []);

  return (
    <Column>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          size={"20px"}
          font={fonts.quicksand}
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          nome:
        </Text>
        <Text size={"20px"} font={fonts.quicksand}>
          {user.name}
        </Text>
      </Row>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          size={"20px"}
          font={fonts.quicksand}
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          data de nascimento:
        </Text>
        <Text size={"20px"} font={fonts.quicksand}>
          {user.date_of_birth}
        </Text>
      </Row>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          size={"20px"}
          font={fonts.quicksand}
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          CPF:
        </Text>
        <Text size={"20px"} font={fonts.quicksand}>
          {format.cpf(user.cpf)}
        </Text>
      </Row>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          size={"20px"}
          font={fonts.quicksand}
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          telefone:
        </Text>
        <Text size={"20px"} font={fonts.quicksand}>
          {user.cel}
        </Text>
      </Row>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          size={"20px"}
          font={fonts.quicksand}
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          email:
        </Text>
        <Text size={"20px"} font={fonts.quicksand}>
          {user.email}
        </Text>
      </Row>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          size={"20px"}
          font={fonts.quicksand}
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          cep:
        </Text>
        <Text size={"20px"} font={fonts.quicksand}>
          {user.cep}
        </Text>
      </Row>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          size={"20px"}
          font={fonts.quicksand}
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          endereço:
        </Text>
        <Text size={"20px"} font={fonts.quicksand}>
          {user.address}
        </Text>
      </Row>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          size={"20px"}
          font={fonts.quicksand}
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          cidade:
        </Text>
        <Text size={"20px"} font={fonts.quicksand}>
          {user.city}
        </Text>
      </Row>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          size={"20px"}
          font={fonts.quicksand}
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          uf:
        </Text>
        <Text size={"20px"} font={fonts.quicksand}>
          {user.uf}
        </Text>
      </Row>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          size={"20px"}
          font={fonts.quicksand}
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          escola:
        </Text>
        <Text size={"20px"} font={fonts.quicksand}>
          {school?.name}
        </Text>
      </Row>

    </Column>
  );
};

export default EditProfileItems;
