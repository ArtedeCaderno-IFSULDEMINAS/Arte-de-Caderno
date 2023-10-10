import { links, loggedLinks } from "src/router/links";
import { MenuContainer, NavDrop, NavLink, NavbarRow } from "./components/style";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { useState } from "react";
import Cookies from "js-cookie";
import { Row } from "src/styles/sharedStyles";
import { icons } from "src/styles/icons";

const Navbar = ({ currentPage }) => {
  const desktop = useMediaQuery("(min-width: 770px)");
  const [sidebar, setSidebar] = useState(false);
  const isLogged = Cookies.get("isLogged");
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("isLogged");
    Cookies.remove("accessType");
    navigate("/login")
  };

  return (
    <NavbarRow
      style={{
        justifyContent: desktop ? "space-between" : "space-evenly",
      }}
    >
      <MenuContainer width={"30%"}>
        <Link to={"/"}>
          <img
            src={require("src/assets/img/logos/logo.png")}
            alt=""
            style={{
              height: "70px",
            }}
          />
        </Link>
      </MenuContainer>
      {desktop && (
        <>
          <MenuContainer
            width={isLogged ? "70%" : "40%"}
            style={{ alignItems: "end", height: "60px" }}
          >
            {links.map((link) => {
              return (
                <Link
                  to={link.path}
                  key={link}
                  style={{
                    color: "black",
                    textDecoration:
                      link.text === currentPage ? "underline" : "none",
                    opacity: link.text === currentPage ? 1 : 0.7,
                  }}
                >
                  <NavLink>{link.text}</NavLink>
                </Link>
              );
            })}
            {isLogged &&
              loggedLinks.map((link, index) => {
                return (
                  <Link
                    to={link.path}
                    key={link}
                    style={{
                      color: "black",
                      textDecoration:
                        link.text === currentPage ? "underline" : "none",
                      opacity: link.text === currentPage ? 1 : 0.7,
                    }}
                  >
                    <NavLink>{link.text}</NavLink>
                  </Link>
                );
              })}
            {isLogged && <NavLink onClick={logout}>Sair</NavLink>}
          </MenuContainer>
        </>
      )}

      {!desktop && (
        <FontAwesomeIcon
          icon={icons.hamburger}
          style={{
            position: "fixed",
            top: "30px",
            right: "20px",
            fontSize: "20px",
          }}
          onClick={() => setSidebar(!sidebar)}
        />
      )}

      {!desktop && sidebar && (
        <NavDrop onBlur={() => setSidebar(false)}>
          {links.map((link) => {
            return (
              <Row style={{ padding: "0.5rem" }}>
                <Link
                  key={link}
                  to={link.path}
                  style={{
                    color: "black",
                    textDecoration:
                      link.text === currentPage ? "underline" : "none",
                    opacity: link.text === currentPage ? 1 : 0.7,
                  }}
                >
                  <NavLink>{link.text}</NavLink>
                </Link>
              </Row>
            );
          })}
          {!isLogged && (
            <Row style={{ padding: "0.5rem" }}>
              <Link
                to={"/login"}
                style={{
                  color: "black",
                  textDecoration: "none",
                  opacity: 0.7,
                }}
              >
                <NavLink>Entrar</NavLink>
              </Link>
            </Row>
          )}
          {isLogged &&
            loggedLinks.map((link, index) => {
              return (
                <Row style={{ padding: "1rem" }}>
                  <Link
                    to={link.path}
                    key={link}
                    style={{
                      color: "black",
                      textDecoration:
                        link.text === currentPage ? "underline" : "none",
                      opacity: link.text === currentPage ? 1 : 0.7,
                    }}
                  >
                    <NavLink>{link.text}</NavLink>
                  </Link>
                </Row>
              );
            })}
          <Row style={{ padding: "1rem" }}>
            {isLogged && <NavLink onClick={logout}>Sair</NavLink>}
          </Row>
        </NavDrop>
      )}

      {desktop && !isLogged && (
        <MenuContainer
          width={"30%"}
          style={{ justifyContent: "center", gap: "5px" }}
        >
          <FontAwesomeIcon icon={icons.user} className="fa-xl" />
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <NavLink>Entrar</NavLink>
          </Link>
          /
          <Link
            to={"/cadastrar"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <NavLink>Cadastrar</NavLink>
          </Link>
        </MenuContainer>
      )}
    </NavbarRow>
  );
};

export default Navbar;
