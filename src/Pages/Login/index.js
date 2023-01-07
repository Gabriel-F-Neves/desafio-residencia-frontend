import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import { PrivateRoute } from "../../Routes/privateRoute";
import { api } from "../../Service/Api";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";


export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { armazenaDadosUsuario } = useContext(DataContext);

  const Navigation = useNavigate();

  const Visible = () => {
    if (visiblePassword != true) {
      setVisiblePassword(true)
    }
    else {
      setVisiblePassword(false)
    }
  }

  const notifyPassword = () =>
    toast.error("Login ou senha não conferem", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleLogin = async () => {
    var tokenJwt = null;

    try {
      const retorno = await api.post('/auth/login', {
        userLogin: login,
        userPassword: password
      });

      if (retorno.status === 200) {
        tokenJwt = retorno.data;
        console.log("Retordo token: " + JSON.stringify(tokenJwt))
        localStorage.setItem("key_Login", tokenJwt["jwt-token"])
        console.log('VALOR DO LOCALSTORAGE: ' + localStorage.getItem("key_Login"));
        armazenaDadosUsuario(localStorage.getItem("key_Login"));
        Navigation("/home")
        PrivateRoute()
      } else {
        console.log('Erro ao realizar a autenticação');
      }
    } catch (error) {
      notifyPassword();
    }
  }
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <div className="login-form">
            <span className="login-form-title"> Bem vindo </span>
            <span className="login-form-title">
            </span>
            <div className="wrap-input">
              <input
                className={login !== "" ? "has-val input" : "input"}
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Login"></span>
            </div>
            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type={visiblePassword == true ? "login" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
              <IconButton edge="end" onClick={() => { Visible() }} >
                <VisibilityIcon sx={{ fontSize: 20, color: '#eee' }} />
              </IconButton>
            </div>
            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={() => handleLogin()}>Login</button>
            </div>
            <div className="text-center">
              <span className="txt1">Não possui conta? </span>
              <Link to={"/cadastro"} className="txt2" href="#">
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>

  );
}