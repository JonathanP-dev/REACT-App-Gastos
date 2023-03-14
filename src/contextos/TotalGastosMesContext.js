import React, {useContext, useEffect, useState} from 'react';
import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes';

const TotalGastosMesContext = React.createContext();

const useTotalMes = () => useContext(TotalGastosMesContext);

const TotalGastosProvider = ({children}) => {

    const [total, setTotal] = useState(0);
    const gastos = useObtenerGastosDelMes();

    useEffect(() => {
        let acumulado = 0;
        gastos.forEach((gasto) => {
            acumulado += gasto.valor;
        })
        setTotal(acumulado);
    },[gastos])

    return(
        <TotalGastosMesContext.Provider value={{total: total}}>
            {children}
        </TotalGastosMesContext.Provider>
    );
}

export {TotalGastosProvider, useTotalMes}