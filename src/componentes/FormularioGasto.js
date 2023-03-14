import React, { useState, useEffect } from 'react';
import Boton from '../elementos/Boton';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elementos/ElementosDeFormulario';
import { ReactComponent as IconoPlus  } from '../imagenes/plus.svg';
import { useAuth } from '../contextos/AuthContext';
import Alerta from '../elementos/Alerta';
import { useNavigate } from 'react-router-dom';

import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import agregarGasto from '../firebase/agregarGasto';
import editarGasto from '../firebase/editarGasto';

const FormularioGasto = ({gasto}) => {

    const [inputDescripcion, setInputDescripcion] = useState('');
    const [inputValor, setInputValor] = useState('');
    const [categoria, setCategoria] = useState('hogar');
    const [fecha, setFecha] = useState(new Date());
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();

    const {usuario} = useAuth();

    useEffect(() => {
        if(gasto) {
            if(gasto.data().uidUsuario === usuario.uid){
                console.log(gasto);
                setCategoria(gasto.data().categoria);
                setInputDescripcion(gasto.data().descripcion);
                setInputValor(gasto.data().valor);
                setFecha(fromUnixTime(gasto.data().fecha));
            } else {
                navigate('/lista');
            }
        }
    },[gasto, usuario, navigate])

    const handleChange = (e) => {
        if(e.target.name === 'descripcion') {
            setInputDescripcion(e.target.value)
        } else if (e.target.name === 'valor') {
            setInputValor(e.target.value.replace(/[^0-9.]/g, ''))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let valor = parseFloat(inputValor).toFixed(2);

        if(inputDescripcion !== '' && inputValor !== '') {

            if(valor) {
                if(gasto) {
                        editarGasto({
                            id: gasto.id,
                            categoria: categoria, 
                            descripcion: inputDescripcion, 
                            valor: valor,
                            fecha: getUnixTime(fecha)
                        }).then(() => {
                            navigate('/lista');
                        }).catch((error) => {
                            console.log(error);
                        })
                } else {
                    // el .then funciona cuando se devuelve una promesa, si se cumple entonces hace lo siguiente.
                    agregarGasto({
                        categoria: categoria, 
                        fecha: getUnixTime(fecha), 
                        descripcion: inputDescripcion, 
                        valor: valor, 
                        uidUsuario: usuario.uid
                    }).then(() => {
                        setCategoria('hogar');
                        setInputDescripcion('');
                        setInputValor('');
                        setFecha(new Date());
    
                        setEstadoAlerta(true);
                        setAlerta({tipo: 'exito', mensaje: 'Gasto agregado correctamente.'});
                    }).catch((error) => {
                        setEstadoAlerta(true);
                        setAlerta({tipo: 'error', mensaje: 'Hubo un error al intentar agregar el gasto.'});
                    })
                }
            } else {
                setEstadoAlerta(true);
                setAlerta({tipo: 'error', mensaje: 'El valor que ingresaste no es correcto.'})
            }

        } else {
            setEstadoAlerta(true);
            setAlerta({tipo: 'error', mensaje: 'Por favor rellena todos los campos.'})
            
        }

        console.log(inputDescripcion, inputValor, categoria, fecha);
    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias categoria={categoria} setCategoria={setCategoria}/>
                <DatePicker fecha={fecha} setFecha={setFecha}/>
            </ContenedorFiltros>

            <div>
                <Input type='text' name='descripcion' id='descripcion' placeholder='descripcion' value={inputDescripcion} onChange={(e) => handleChange(e)}/>
                <InputGrande type='text' name='valor' id='valor' placeholder='$0.00' value={inputValor} onChange={(e) => handleChange(e)}/>
            </div>
            <ContenedorBoton>
                <Boton as='button' primario conIcono type='submit'> {gasto ? 'Editar gasto' : 'Agregar gasto'}<IconoPlus /></Boton>
            </ContenedorBoton>

            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta} />
        </Formulario>
    );
}
 
export default FormularioGasto;