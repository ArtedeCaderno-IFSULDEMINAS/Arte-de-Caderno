import { BrowserRouter as Router } from "react-router-dom";
import Rotas from "./router/router";
import { useState } from "react";
import { userContext } from "./contexts/userContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState({
    cpf: null,
    password: null,
    twoF: null,
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
      />
    </>
  );
}

export default App;
