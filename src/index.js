// paquetes
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// imagenes
import favicon from './imagenes/logo.png';

// componentes
import App from './App';
import InicioSesion from './componentes/InicioSesion';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import ListaDeGastos from './componentes/ListaDeGastos';
import EditarGasto from './componentes/EditarGasto';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import RutaPrivada from './componentes/RutaPrivada';

// elementos
import Contenedor from './elementos/Contenedor';
import Fondo from './elementos/Fondo';

// contextos
import { AuthProvider } from './contextos/AuthContext';
import { TotalGastosProvider } from './contextos/TotalGastosMesContext';

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel='shortcut icon' href={favicon} type='image/x-icon' />
      </Helmet>

      <AuthProvider>
        <TotalGastosProvider>
          <BrowserRouter>
            <Contenedor>
              <Routes>
                <Route path='/iniciar-sesion' element={<InicioSesion />} />
                <Route path='/crear-cuenta' element={<RegistroUsuarios />} />

                
                <Route path='/categorias' element={<RutaPrivada><GastosPorCategoria /></RutaPrivada>}/> 
                <Route path='/lista' element={<RutaPrivada><ListaDeGastos /></RutaPrivada>}/>
                <Route path='/editar/:id' element={<RutaPrivada><EditarGasto /></RutaPrivada>}/>
                <Route path='/' element={<RutaPrivada><App /></RutaPrivada>}/>
              </Routes>
            </Contenedor>
          </BrowserRouter>
        </TotalGastosProvider>
      </AuthProvider>
      
      <Fondo />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />
);