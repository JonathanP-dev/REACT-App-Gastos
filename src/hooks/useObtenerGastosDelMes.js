import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { startOfMonth, endOfMonth, getUnixTime } from 'date-fns';
import { useAuth } from '../contextos/AuthContext';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';


const useObtenerGastosDelMes = () => {
    
    const [gastos, setGastos] = useState([]);
    const {usuario} = useAuth();
    
    useEffect(() => {

        const inicioMes = getUnixTime(startOfMonth(new Date()));
        const finMes = getUnixTime(endOfMonth(new Date()));
        
        
        if(usuario) {
            
            const consulta = query(
                collection(db, 'gastos'),
                where('uidUsuario', '==', usuario.uid),
                where('fecha', '>=', inicioMes),
                where('fecha', '<=', finMes),
                orderBy('fecha', 'desc')
            );

            const unsuscribe = onSnapshot(consulta, (snapshot) => {
                setGastos(snapshot.docs.map((document) => {
                    return {...document.data(), id: document.id}
                }));
            }, (error) => {console.log(error)});

            return unsuscribe;
        }

    }, [usuario])
    return gastos;
}
 
export default useObtenerGastosDelMes;