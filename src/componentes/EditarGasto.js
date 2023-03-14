import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';
import { useParams } from 'react-router-dom';
import useObtenerGastoPorId from '../hooks/useObtenerGastoPorId';

const EditarGasto = () => {
    const {id} = useParams();
	const [gasto] = useObtenerGastoPorId(id);
    console.log(gasto)
    return (
        <>
            <Helmet>
                <title>Editar gasto</title>
            </Helmet>
            <Header>
                    <BtnRegresar ruta='/lista'/>
                    <Titulo>Editar Gasto</Titulo>
            </Header>
            <FormularioGasto gasto={gasto}/>
            <BarraTotalGastado />
        </>
    );
}
 
export default EditarGasto;