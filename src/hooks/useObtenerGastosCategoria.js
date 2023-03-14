import { useEffect, useState } from "react";
import useObtenerGastosDelMes from "./useObtenerGastosDelMes";


const useObtenerGastoCategoria = () => {

    const [gastosPorCategoria, setGastosPorCategorias] = useState([])
    const gastos = useObtenerGastosDelMes();

    useEffect(() => {
        
            const sumaGastos = gastos.reduce((objetoResultante, objetoActual) => {
                const categoriaActual = objetoActual.categoria;
                const valorActual = objetoActual.valor;
        
                objetoResultante[categoriaActual] += valorActual;
                return objetoResultante;
            }, {
                'comida': 0,
                'cuentas y pagos': 0,
                'hogar': 0,
                'transporte': 0,
                'ropa': 0,
                'salud e higiene': 0,
                'compras': 0,
                'diversion': 0,
                'tango': 0
            });
            // console.log(sumaGastos);
        
            setGastosPorCategorias(Object.keys(sumaGastos).map((elemento) => {
                return {categoria: elemento, valor: sumaGastos[elemento]}
            }));

    }, [gastos])

    return gastosPorCategoria;
}
 
export default useObtenerGastoCategoria;