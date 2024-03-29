import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format'
import { es } from 'date-fns/locale'



const ContenedorInput = styled.div`
    position: relative;
    width: 40%;
    transition: .5s ease all;
    @media(max-width: 60rem){ /* 950px */
        width: 100%;
    }
    
    div {
        width: 100%;
        margin: 0;
        justify-content: center;
    }
    table {
        width: 100%;
        justify-content: center;
        margin: 0;
    }
    input {
        font-family: 'Work Sans', sans-serif;       
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
    }

    .rdp {
        position: absolute;
        display: flex;
        justify-content: center;
        padding: 1rem 1rem;
    }

    .rdp-months {
        display: flex;
        justify-content: center;
    }

    .rdp-caption {
        display: flex;
        justify-content: center;
    }

    .rdp-month {
        background: #fff;
        box-shadow: rgba(0, 0, 0, .24) 0px 3px 8px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        table {
            padding: auto;
            margin: auto;
        }


    }
    .rdp-nav {
        width: 20%;
    }

    @media(max-width: 60rem){ /* 950px */
        & > * {
            width: 100%;
        }
    }
`;

const formatFecha = (fecha = new Date()) => {
    return format(fecha, `dd 'de' MMMM 'de' yyyy`, {locale: es})
};

const DatePicker = ({fecha, setFecha}) => {

    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        if(visible){
            setVisible(!visible);
        }
    }, [fecha]);

    
    return (
        <ContenedorInput>
            <input type='text' readOnly value={formatFecha(fecha)} onClick={() => setVisible(!visible)} />
            {visible && <DayPicker mode="single" selected={fecha} onSelect={setFecha} locale={es}/>}
        </ContenedorInput>
    );  
}
 
export default DatePicker;