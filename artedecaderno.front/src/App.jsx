import { BrowserRouter as Router } from "react-router-dom";
import Rotas from "./router/router";
import { useState } from "react";
import { userContext } from "./contexts/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState({
    cpf: null,
    password: null,
    twoF: null,
    name: null,
    date_of_birth: null,
    perfil: null,
    cel: null,
    cep: null,
    address: null,
    city: null,
    uf: null,
    schoolId: [null],
    drawsId: [null],
    email: null,
    rua: null,
    bairro: null,
    numero: null,
  });

  return (
    <>
      <Router>
        <userContext.Provider value={{ user, setUser }}>
          <Rotas />
        </userContext.Provider>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          zIndex: 9999999999,
        }}
      />
    </>
  );
}

export default App;
