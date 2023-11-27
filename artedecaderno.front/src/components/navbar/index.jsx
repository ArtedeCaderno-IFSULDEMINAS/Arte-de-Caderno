import { links } from "src/router/links";
import { MenuContainer, NavDrop, NavLink, NavbarRow } from "./components/style";
import { Link } from "react-router-dom";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { useState } from "react";

const Navbar = ({ currentPage }) => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [sidebar, setSidebar] = useState(false);

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
            width={"40%"}
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
          </MenuContainer>
          <MenuContainer
            width={"30%"}
            style={{ justifyContent: "center", gap: "5px" }}
          >
            {/* <FontAwesomeIcon icon={faCircleUser} className="fa-xl" />
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
            </Link> */}
          </MenuContainer>
        </>
      )}

      {!desktop && (
        <FontAwesomeIcon
          icon={faBars}
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
            );
          })}
        </NavDrop>
      )}
    </NavbarRow>
  );
};

export default Navbar;