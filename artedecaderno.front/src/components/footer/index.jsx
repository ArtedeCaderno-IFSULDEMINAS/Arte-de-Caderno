import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { colors, fonts } from "src/styles/constants";
import { icons } from "src/styles/icons";
import { BodyLink, Column, Row, Text } from "src/styles/sharedStyles";

const Footer = () => {
  const desktop = useMediaQuery("(min-width: 768px)");

  return (
    <Row style={{ backgroundColor: colors.lightGrey, padding: "1.5rem" }} width={"100vw"} >
      <Row width={desktop ? "50%" : "100%"}>
        <Column width={desktop ? "50%" : "100%"}>
          <Text
            font={fonts.league}
            style={{ fontWeight: 600, textTransform: "uppercase" }}
          >
            siga-nos
          </Text>
          <Row style={{ justifyContent: "center" }} gap={"1rem"}>
            <a
              href="https://instagram.com/laboratorio.voa?igshid=MzRlODBiNWFlZA=="
              target="_blank"
            >
              <BodyLink>
                <FontAwesomeIcon
                  icon={icons.instagram}
                  style={{ fontSize: "20px" }}
                />
              </BodyLink>
            </a>
            <a
              href="https://www.tiktok.com/@laboratorio.voa?_t=8g9h7ZH36jl&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BodyLink>
                <FontAwesomeIcon
                  icon={icons.tiktok}
                  style={{ fontSize: "20px" }}
                />
              </BodyLink>
            </a>
            <a
              href="https://voalab.studio/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <BodyLink>
                <FontAwesomeIcon icon={icons.web} style={{ fontSize: "20px" }} />
              </BodyLink>
            </a>
          </Row>
        </Column>
        <Column width={desktop ? "50%" : "100%"}>
          <Text
            font={fonts.league}
            style={{ fontWeight: 600, textTransform: "uppercase" }}
          >
            institucional
          </Text>
          <a
            href="https://portal.pcs.ifsuldeminas.edu.br/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <BodyLink>
              <i>Campus</i> Poços de Caldas
            </BodyLink>
          </a>
        </Column>
      </Row>
    </Row>
  );
};

export default Footer;
