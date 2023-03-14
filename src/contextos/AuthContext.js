import React, { useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

//hook para acceder al contexto
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider= ({children}) => {
    const [usuario, setUsuario] = useState();
    const [cargando, setCargando] = useState(true);

    // para comprobar si hay un usuario
    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            setUsuario(usuario);
            setCargando(false);
        });

        return cancelarSuscripcion;
    }, []);

    return (
        <AuthContext.Provider value={{usuario: usuario}}>
            {!cargando && children}
        </AuthContext.Provider>
    );

}
 
export { AuthProvider, AuthContext, useAuth };