import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton'
import "./styles.css";

export const Cadastro = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [visiblePassword, setVisiblePassword] = useState(false)

    const Navigation = useNavigate()

    const Visible = () => {
        if(visiblePassword !== true){
            setVisiblePassword(true)
        }
        else{
            setVisiblePassword(false)
        }
    }

    const notify = () =>
    toast.success("Cadastro realizado com sucesso", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyPassword = () =>
    toast.error("As senhas são diferentes", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    const Registro = async () => {
        if(password === confirmPassword){
            await api.post(
                "/auth/registro",
                {             
                  userLogin: login ,
                  userPassword: password             
                }
            ).then(res => {
                if(res.status === 200){
                  notify();
                    setTimeout(() => {
                      console.log("Delayed for 3 second.");
                      Navigation("/");
                    }, "3000");
                }
                console.log('Sucesso na requisição')
            }).catch((err) => {
                console.log('erro ao relizar a requisição: ' + JSON.stringify(err))
            })
        }else{
            notifyPassword();
            console.log('Senhas não conferem')
        }
    }

    return(
        <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <div className="login-form">
              <span className="login-form-title"> Cadastre-se </span>
              <span className="login-form-title">
              </span>
              <div className="wrap-input">
                <input
                  className={login !== "" ? "has-val input" : "input"}
                  type="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Login"></span>
              </div> 
              <div className="wrap-input">
                <input
                  className={password !== "" ? "has-val input" : "input"}
                  type= {visiblePassword === true ? "login" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Password"></span>
                <IconButton edge="end" onClick={() => {Visible()}} >
                    <VisibilityIcon sx={{ fontSize: 20, color:'#eee' }}/>
                </IconButton>
              </div>
              <div className="wrap-input">
                <input
                  className={confirmPassword !== "" ? "has-val input" : "input"}
                  type= {visiblePassword === true ? "login" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="focus-input" data-placeholder="confirmPassword"></span>
                <IconButton edge="end" onClick={() => {Visible()}} >
                    <VisibilityIcon sx={{ fontSize: 20, color:'#eee' }}/>
                </IconButton>
              </div>
              <div className="container-login-form-btn">
                <button className="login-form-btn" onClick={() => {Registro()}}>Cadastrar</button>
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