import {db} from './firebaseConfig';
import {doc, updateDoc} from 'firebase/firestore';

const editarGasto = async({id, categoria, descripcion, valor, fecha}) => {
	const documento = doc(db, 'gastos', id);
	return await updateDoc(documento, {
		categoria: categoria,
		descripcion: descripcion,
		valor: Number(valor),
		fecha: fecha
	});
}

export default editarGasto;