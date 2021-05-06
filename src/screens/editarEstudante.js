import loader from '../assets/images/loader.gif';
import '../assets/css/index.css';
import React, { useState, useEffect, useRef } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useSelector, useDispatch } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Header from '../components/header';
import Api from '../api/api';
import { numberMask } from '../components/numberMask';


export default function EditarEstudante() {

    const student = useSelector(state => state.student);
    const [init, setInit] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [local, setLocal] = useState(null);
    const [loading, setLoading] = useStateWithCallbackLazy(false);
    const nome = useRef(null);
    const serie = useRef(1);
    const dateNasc = useRef(null);


    const redirectTo = (local) => {
        setLocal(local);
        setRedirect(true);
    }

    const edit = async () => {

        if(!/\S/.test(nome.current.value) || !/\S/.test(serie.current.value)) {
            alert("Informe nome e série!")
            return;
        }
        
        const d = new Date(dateNasc.current.value); 

        if(d.valueOf() > (Date.now() - 86400000)) {
            alert("Informe uma data do passado!");
            return;
        }
    
        student.student.nome = nome.current.value;
        student.student.serie = serie.current.value;
        student.student.data_nasc = d.valueOf();
    
        setLoading(true);
        const result =  await Api
                .updateStudant(student.student.id, student.student);

        if(result.nome) setRedirect(true);
        else setLoading(false, () => 
                alert("Tente novamente! Erro no servidor."));
    }

    useEffect(() => {

        let d = new Date(student.student.data_nasc);
        nome.current.value = student.student.nome;
        serie.current.value = student.student.serie;
        dateNasc.current.value = d.toISOString().substring(0,10);
    }, [init]);


    return (

        <div className="endereco">
            
            <Header />

            {redirect && <Redirect to={local} />}

            {loading && <div className="loading"><img src={loader} 
            alt="imagem gif carregando" /></div>}

            {!loading &&

            <div>

                <div className="text-editar">Editar</div>
                <fieldset>
                    <legend>Dados do estudante:</legend>

                    <table>
                        <tr>
                            <td><b>Nome:</b></td>
                            <td className="field-input">
                                <input type="text" maxLength="100" 
                                ref={nome} />
                            </td>    
                        </tr>   
                        <tr>
                            <td><b>Data de nascimento:</b></td>
                            <td className="field-input">
                                <input type="date" 
                                ref={dateNasc} />
                            </td>    
                        </tr>                        
                        <tr>
                            <td><b>Série:</b></td>
                            <td className="field-input">
                                <input type="text" onKeyUp={(evt) => numberMask(evt,true)} 
                                onKeyDown={(evt) => numberMask(evt,true)} maxLength="1" ref={serie} />
                            </td>    
                        </tr>   
                        <tr>
                            <td><b>Endereço:</b></td>
                            <td className="field-input">
                                <a href="#" onClick={() => 
                                    redirectTo("/endereco")}>editar endereço</a>
                            </td>    
                        </tr>   
                        <tr>
                            <td><b>Mãe:</b></td>
                            <td className="field-input">
                                <a href="#" onClick={() => 
                                    redirectTo("/mae")}>editar dados da mãe</a>
                            </td>    
                        </tr>     
                    </table>

                    <div className="buttons-editar">
                        <div><button onClick={() => edit()} >Editar</button></div>
                        <div><button onClick={() => redirectTo("/")} >
                            Voltar</button></div>
                    </div>

                </fieldset>

            </div>}

        </div>
    );
}