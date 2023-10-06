import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { colors, fonts } from "src/styles/constants";
import { BodyLink, Column, Row, Text } from "src/styles/sharedStyles";

const Footer = () => {
  const desktop = useMediaQuery("(min-width: 768px)");

  return (
    <Row style={{ backgroundColor: colors.lightGrey, padding: "1.5rem" }}>
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
                  icon={faInstagram}
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
                <FontAwesomeIcon icon={faTiktok} style={{ fontSize: "20px" }} />
              </BodyLink>
            </a>
            <a
              href="https://voalab.studio/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <BodyLink>
                <FontAwesomeIcon icon={faGlobe} style={{fontSize: "20px"}} />
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