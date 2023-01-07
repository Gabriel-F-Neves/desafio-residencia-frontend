import React, { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [dadosUsuario, setDadosUsuario] = useState();

    const armazenaDadosUsuario = (jwt) => {
        var tokenDecodificado = jwt_decode(jwt);
    

        var user = tokenDecodificado.usuario;

        user = JSON.parse(user)

        setDadosUsuario({
            userId: user?.userId,
            userLogin: user?.userLogin,
            token: jwt
        })
    }
    return(
        <DataContext.Provider value={{
            dadosUsuario,
            armazenaDadosUsuario
        }}>
            {children}
        </DataContext.Provider>
    );
}