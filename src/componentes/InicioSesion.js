import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from './../elementos/Header';
import Boton from './../elementos/Boton';
import { Formulario, Input, ContenedorBoton } from '../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin} from '../imagenes/login.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alerta from '../elementos/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

const InicioSesion = () => {


    const navigate = useNavigate();

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});

    const handleChange = (e) => {
        if(e.target.name === 'email') {
            setCorreo(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
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

        if(correo === '' || password === ''){
            console.log('rellenar datos');
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error',
                mensaje: 'debe rellenar todos los datos'
            })
            return;
        }

        // adelanto de login

        await signInWithEmailAndPassword(auth, correo, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            console.log('se logeo el usuario: '+ user.email);
            navigate('/');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            let mensaje;
            setEstadoAlerta(true);

            switch (errorCode) {
                case 'auth/wrong-password':
                    mensaje = 'la contraseña es incorrecta.'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'Usuario incorrecto.'
                    break;
                case 'auth/network-request-failed':
                    mensaje = 'Error! Revisar acceso a internet';
                    break;
                default:
                    mensaje = 'Hubo un error al intentar iniciar sesion.';
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
                <title>Iniciar Sesion</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Inicio de sesion</Titulo>
                    <div>
                        <Boton to='/crear-cuenta'>Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input type='email' name='email' placeholder='Correo Electronico' value={correo} onChange={handleChange}/>
                <Input type='password' name='password' placeholder='Password' value={password} onChange={handleChange}/>
                <ContenedorBoton>
                    <Boton as='button' primario type='Submit'>Iniciar Sesion</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta}/>
        </>
    );
}
 
export default InicioSesion;