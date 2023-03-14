// ----- Mi solucion

// import { doc, getDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebaseConfig";
// import { useNavigate } from 'react-router-dom';

// const useObtenerGastoPorId = async(id) => {

//     const [gasto, setGasto] = useState('');
//     const navigate = useNavigate();
    
//     useEffect(() => {

//         const obtenerGasto = async() => {
//             const documento = await getDoc(doc(db, 'gastos', id))
//             if(typeof documento.data() === 'undefined' || documento.data() === null) {
//                 navigate('/lista');
//             } else {
//                 // console.log(documento.data());
//                 setGasto(documento.data());
//             }
//         }
        
//         obtenerGasto();

//     }, [navigate, id])

// 	return [gasto];
// }
 
// export default useObtenerGastoPorId;


// ---- Solucion Carlos Arturo

import {useEffect, useState} from 'react';
import {db} from './../firebase/firebaseConfig';
import {useNavigate} from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';

const useObtenerGasto = (id) => {
	const navigate = useNavigate();
	const [gasto, establecerGasto] = useState('');
	
	useEffect(() => {
		const obtenerGasto = async() => {
			const documento = await getDoc(doc(db, 'gastos', id));

			if(documento.exists){
				establecerGasto(documento);
			} else {	
				navigate('/lista');
			}
		}

		obtenerGasto();
	}, [navigate, id]);

	return [gasto];
}
 
export default useObtenerGasto;