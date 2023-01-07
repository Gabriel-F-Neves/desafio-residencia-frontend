import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";

export function PrivateRoute({children}){

    const {dadosUsuario} = useContext(DataContext)
    console.log("DADOS DO USUARIO: " + JSON.stringify(dadosUsuario))

    var logado = localStorage.getItem("key_Login")

    return logado !== null ? children : <Navigate to="/" />
}