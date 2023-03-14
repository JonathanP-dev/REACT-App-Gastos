import { db } from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

const agregarGasto = async({categoria, fecha, descripcion, valor, uidUsuario}) => {

  return addDoc(collection(db, 'gastos'), {
      categoria,
      fecha,
      descripcion,
      valor: Number(valor),
      uidUsuario
  });
}
 
export default agregarGasto;