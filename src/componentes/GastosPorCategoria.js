import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastoCategoria from '../hooks/useObtenerGastosCategoria';
import { ListaDeCategorias, ElementoListaCategorias, Categoria, Valor } from '../elementos/ElementosDeLista';
import IconoCategoria from '../elementos/IconoCategoria';
import convertirAMoneda from '../funciones/convertirAMoneda';

const GastosPorCategoria = () => {

    const gastos = useObtenerGastoCategoria();
    return (
        <>
            <Helmet>
                <title>Gastos por categoria</title>
            </Helmet>
            <Header>
                    <BtnRegresar />
                    <Titulo>Gastos por categoria</Titulo>
            </Header>

            <ListaDeCategorias>
                {gastos.map((gasto, index) => {
                    return (
                        <ElementoListaCategorias key={index}>
                            <Categoria>
                                <IconoCategoria id={gasto.categoria} />
                                    {gasto.categoria}
                            </Categoria>
                            <Valor>{convertirAMoneda(gasto.valor)}</Valor>
                        </ElementoListaCategorias>
                    )
                })}
            </ListaDeCategorias>
            
            <BarraTotalGastado />
        </>
    );
}
 
export default GastosPorCategoria;