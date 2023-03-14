import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import { useAuth } from '../contextos/AuthContext';
import BarraTotalGastado from './BarraTotalGastado';
import {
    Lista,
    ElementoLista,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from '../elementos/ElementosDeLista';
import IconoCategoria from '../elementos/IconoCategoria';
import convertirAMoneda from '../funciones/convertirAMoneda';
import { ReactComponent as IconoEditar } from '../imagenes/editar.svg';
import { ReactComponent as IconoBorrar } from '../imagenes/borrar.svg';
import { Link } from 'react-router-dom';
import Boton from '../elementos/Boton';

import { format, fromUnixTime } from 'date-fns';
import { es } from 'date-fns/locale';

import useObtenerGastos from '../hooks/useObtenerGastos';
import Alerta from '../elementos/Alerta';
import borrarGasto from '../firebase/borrarGasto';

const ListaDeGastos = () => {
    const {usuario} = useAuth();
    console.log(usuario.email)

    const [alerta, setAlerta] = useState({});
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();
    console.log(gastos);

    const formatearFecha = (fecha) => {
        return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es})
    }

    const fechaEsIgual = (gastos, index, gasto) => {
        if(index !== 0){
            const fechaActual = formatearFecha(gasto.fecha);
            const fechaGastoAnterior = formatearFecha(gastos[index - 1].fecha);

            if(fechaActual === fechaGastoAnterior){
                return true;
            } else {
                return false;
            }
        }
    }

    const handleBorrar = (id) => {
        borrarGasto(id);
        setAlerta({tipo: 'exito', mensaje: 'Gasto borrado correctamente.'});
        setEstadoAlerta(true);
    }

    
    return (       
        <>
            <Helmet>
                <title>Lista de gastos</title>
            </Helmet>
            <Header>
                    <BtnRegresar />
                    <Titulo>Lista de gastos</Titulo>
            </Header>

            <Lista>
                {gastos.map((gasto, index) => {
                    return(
                        <div key={gasto.id}>
                            {!fechaEsIgual(gastos, index, gasto) &&
                                <Fecha>{formatearFecha(gasto.fecha)}</Fecha>
                            }
                            <ElementoLista>
                                <Categoria>
                                    <IconoCategoria id={gasto.categoria} />{gasto.categoria}
                                </Categoria>
                                <Descripcion>
                                    {gasto.descripcion}
                                </Descripcion>
                                <Valor>
                                    {convertirAMoneda(gasto.valor)}
                                </Valor>
                                
                                <ContenedorBotones>
                                    <BotonAccion as={Link} to={`/editar/${gasto.id}`} id={gasto.id}><IconoEditar /></BotonAccion>
                                    <BotonAccion onClick={() => handleBorrar(gasto.id)}><IconoBorrar /></BotonAccion>
                                </ContenedorBotones>
                            </ElementoLista>
                        </div>
                    );
                })}

                {hayMasPorCargar &&
                    <ContenedorBotonCentral>
                            <BotonCargarMas onClick={() => obtenerMasGastos()}>Cargar Mas</BotonCargarMas>
                    </ContenedorBotonCentral>
                }

                {gastos.length === 0 &&
                    <ContenedorSubtitulo>
                        <Subtitulo>No hay gastos para mostrar</Subtitulo>
                        <Boton as={Link} to='/'>Agregar Gasto</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>
            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta} />
            <BarraTotalGastado />
        </>
    );
}
 
export default ListaDeGastos;