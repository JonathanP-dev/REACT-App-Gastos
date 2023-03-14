import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from './../elementos/Header';
import Boton from './../elementos/Boton';
import { Formulario, Input, ContenedorBoton } from '../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin} from '../imagenes/registro.svg';
import styled from 'styled-components';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Alerta from '../elementos/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

const RegistroUsuarios = () => {

    const navigate = useNavigate();

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});

    const handleChange = (e) => {
        switch(e.target.name) {
            case 'email':
                setCorreo(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setEstadoAlerta(false);
        setAlerta({});

        // comprobar que el correo sea valido desde el lado del cliente
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if( !expresionRegular.test(correo) ){
            console.log('correo invalido');
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error',
                mensaje: 'correo invalido'
            })
            return;
        }

        if(correo === '' || password === '' || password2 === ''){
            console.log('rellenar datos');
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error',
                mensaje: 'debe rellenar todos los datos'
            })
            return;
        }
        
        if(password !== password2) {
            console.log('no coinciden los passwords ingresados');
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error',
                mensaje: 'no coinciden las contraseñas'
            })
            return;
        }


        // Registro del usuario en firebase
        createUserWithEmailAndPassword(auth, correo, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            console.log('se registro el usuario');
            // ...
            navigate('/');

        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            let mensaje;
            setEstadoAlerta(true);

            switch (errorCode) {
                case 'auth/weak-password':
                    mensaje = 'la contraseña debe tener al menos 6 caracteres.'
                    break;
                case 'auth/invalid-password':
                    mensaje = 'contraseña invalida';
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'correo previamente registrado';
                    break;
                case 'auth/invalid-email':
                    mensaje = 'correo electronico invalido';
                    break;
                case 'auth/network-request-failed':
                    mensaje = 'Error! Revisar acceso a internet';
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.';
                    break;
            }
            // ..
            setAlerta({
                tipo: 'error',
                mensaje: mensaje
            })
        });
    }

    return (
        <>
            <Helmet>
                <title>Crear cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to='/iniciar-sesion'>Iniciar Sesion</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input type='email' name='email' placeholder='Correo Electronico' value={correo} onChange={handleChange}/>
                <Input type='password' name='password' placeholder='Password' value={password} onChange={handleChange}/>
                <Input type='password' name='password2' placeholder='Repetir password' value={password2} onChange={handleChange}/>
                <ContenedorBoton>
                    <Boton as='button' primario type='Submit'>Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>

            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta}/>
        </>
    );
}
 
export default RegistroUsuarios;