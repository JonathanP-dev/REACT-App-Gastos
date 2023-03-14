import { doc, deleteDoc } from "firebase/firestore";
import { db } from './firebaseConfig';

const borrarGasto = async(id) => {
    await deleteDoc(doc(db, "gastos", id))
}

export default borrarGasto;