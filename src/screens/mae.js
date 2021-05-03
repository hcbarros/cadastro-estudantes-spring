import loader from '../assets/images/loader.gif';
import '../assets/css/index.css';
import React, { useState, useEffect, useRef } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useSelector, useDispatch } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Header from '../components/header';
import { editarMae } from '../components/editarMae';
import { cpfMask } from '../components/cpfMask';


export default function Mae() {

    const student = useSelector(state => state.student);
    const [init, setInit] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useStateWithCallbackLazy(false);
    const nome = useRef(null);
    const cpf = useRef(null);
    const datePay = useRef(null);


    const edit = async () => {

       setLoading(true); 
       const result = await editarMae(nome, cpf, datePay, student);
       if(!result) return; 

        if(result.nome) setRedirect(true);
        else setLoading(false, () => 
                alert("CPF inválido!"));
    }

    useEffect(() => {

        let d = new Date(student.student.mae.data_pagamento);
        nome.current.value = student.student.mae.nome;
        cpf.current.value = student.student.mae.cpf;
        datePay.current.value = d.toISOString().substring(0,10);
    }, [init]);


    return (

        <div className="endereco">
            
            <Header />

            {redirect && <Redirect to="/" />}

            {loading && <div className="loading"><img src={loader} 
            alt="imagem gif carregando" /></div>}

            {!loading &&

            <div>

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
                                onKeyDown={(evt) => cpfMask(evt)} maxLength="14" ref={cpf} />
                            </td>    
                        </tr>   
                        <tr>
                            <td><b>Data de pagamento:</b></td>
                            <td className="field-input date-pay">
                                <input type="date" name="data_pagamento" 
                                ref={datePay} />
                            </td>    
                        </tr>                        
                    </table>

                    <div className="buttons-editar">
                        <div><button onClick={() => edit()} >Editar</button></div>
                        <div><button onClick={() => setRedirect(true)} >
                            Voltar</button></div>
                    </div>

                </fieldset>

            </div>}

        </div>
    );
}