import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cadastro } from '../Pages/Cadastro';
import { Login } from '../Pages/Login';
import { Home } from '../Pages/Home';
import { DataProvider } from '../Context/DataContext';
import { PrivateRoute } from './privateRoute';


export const Rota = () => {
  
  return (
    <DataProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login /> } />
                <Route path="/cadastro" element={ <Cadastro /> } />
                <Route 
                  path="/home" 
                  element={ 
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute> 
                   } 
                />
            </Routes> 
        </BrowserRouter>
      </DataProvider>
  )
}