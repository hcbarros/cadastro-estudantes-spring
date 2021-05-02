
import '../assets/css/index.css';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/header';
import Api from '../api/api';


export default function Mae() {

    const student = useSelector(state => state.student);
    const [init, setInit] = useState(true);
    const nome = useRef(null);
    const cpf = useRef(null);
    const datePay = useRef(null);

    const cpfMask = (evt) => {

        let value = evt.target.value;
        value = value.replace( /[^\d]/g, '' )
                     .replace(/([0-9]{3}[0-9]{6}[0-9]{9})$/g, ".$1.$2.$3");        

        cpf.current.value = value;             
    }

    const getDate = () => {
        let d = new Date(student.student.mae.data_pagamento);
        return d.toISOString().substring(0,10);
    }

    useEffect(() => {

        nome.current.value = student.student.mae.nome;
        cpf.current.value = student.student.mae.cpf;
        datePay.current.value = getDate();
    }, [init]);

    return (

        <div className="mae">
            
            <Header />

            <div className="text-editar">Editar</div>
            <fieldset>
                <legend>Dados da mãe:</legend>

                <table>
                     <tr>
                        <td><b>Nome:</b></td>
                        <td className="field-input">
                            <input type="text" maxLength="100" minLength="1" name="nome" 
                            ref={nome} />
                        </td>    
                     </tr>   
                     <tr>
                        <td><b>CPF:</b></td>
                        <td className="field-input">
                            <input type="text" name="cpf" onKeyUp={(evt) => cpfMask(evt)} 
                            onKeyDown={(evt) => cpfMask(evt)} ref={cpf} />
                        </td>    
                     </tr>   
                     <tr>
                        <td><b>Data de pagamento:</b></td>
                        <td className="field-input date-pay">
                            <input type="date" name="data_pagamento" 
                            ref={datePay} />
                        </td>    
                     </tr>   
                     <input type="submit" value="Editar" />
                </table>

            </fieldset>

        </div>
    );
}