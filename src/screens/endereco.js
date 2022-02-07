import loader from '../assets/images/loader.gif';
import '../assets/css/index.css';
import React, { useState, useEffect, useRef } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useSelector, useDispatch } from 'react-redux';
import {Redirect} from 'react-router-dom';
import $ from 'jquery';
import Header from '../components/header';
import Api from '../api/api';
import { numberMask } from '../components/numberMask';
import { cepMask } from '../components/cepMask';
import { getCEP } from '../components/getCEP';


export default function Endereco() {

    const student = useSelector(state => state.student);
    const [init, setInit] = useState(true);
    const [state, setState] = useState("AC");
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useStateWithCallbackLazy(false);
    const cep = useRef(null);
    const rua = useRef(null);
    const numero = useRef(null);
    const complemento = useRef(null);
    const bairro = useRef(null);
    const cidade = useRef(null);
    const datePay = useRef(null);


    const CEP = async (evt) => {

        cepMask(evt);
        
        if(cep.current.value.length === 9) {
            const obj = await getCEP(cep, rua, complemento, bairro, cidade);
            if(!obj.cep) cep.current.value = "CEP invalido!"
            else setState(obj.uf);
        }
    }   

    const blindEffect = (e) => {
        setState(e);
        $(".drop").toggle( "blind" );
    }

    const edit = async () => {

        if(!/\S/.test(cep.current.value) || !/\S/.test(rua.current.value) || !/\S/.test(cidade.current.value)) {
            alert("Informe o CEP, rua e a cidade!")
            return;
        }
       
        const obj = await Api.getCEP(cep.current.value);
        if(!obj.cep) {
            alert("CEP inválido!");
            return;    
        }

        student.student.endereco.cep = cep.current.value;
        student.student.endereco.rua = rua.current.value;
        student.student.endereco.numero = numero.current.value;
        student.student.endereco.complemento = complemento.current.value;
        student.student.endereco.bairro = bairro.current.value;
        student.student.endereco.cidade = cidade.current.value;
        student.student.endereco.estado = state;

        const result = await Api.updateStudant(student.student.id, student.student);

        if(result.nome) setRedirect(true);
        setLoading(false, () => alert("Erro ao salvar os dados!"));
    }


    const getInput = (label, max, ref) => {
        return  <tr>
                    <td><b>{label}</b></td>
                    <td className="field-input">
                        <input type="text"  
                        maxLength={max} ref={ref} />
                    </td>    
                </tr>    
    }

    useEffect(() => {

        $(".drop").hide();
        cep.current.value = student.student.endereco.cep;    
        rua.current.value = student.student.endereco.rua;
        numero.current.value = student.student.endereco.numero;
        complemento.current.value = student.student.endereco.complemento;
        bairro.current.value = student.student.endereco.bairro;
        cidade.current.value = student.student.endereco.cidade;
        setState(student.student.endereco.estado);
    }, [init, loading]);


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
                    <legend>Endereço:</legend>

                    <table>
                        <tr>
                            <td><b>CEP:</b></td>
                            <td className="field-input">
                                <input type="text" maxLength="9" minLength="1" name="cep"
                                onKeyUp={(evt) => CEP(evt)} onKeyDown={(evt) => CEP(evt)} 
                                ref={cep} />
                            </td>    
                        </tr>   
                        
                        {getInput("Rua:", "120", rua)}
                        
                        <tr>
                            <td><b>Número:</b></td>
                            <td className="field-input">
                                <input type="text" name="numero" ref={numero} 
                                maxLength="9" onKeyUp={(evt) => numberMask(evt,false)} 
                                onKeyDown={(evt) => numberMask(evt,false)} />
                            </td>    
                        </tr>    

                        {getInput("Complemento:", "50", complemento)}
                        {getInput("Bairro:", "100", bairro)}
                        {getInput("Cidade:", "100", cidade)}

                        <tr>
                            <td><b>Estado:</b></td>
                            <td className="field-input">
                                <div className="estados">
                                    <div className="estado" onClick={() => blindEffect("AC")}
                                        ><div className="estado-init">{state}</div><div className="arrow"></div></div>

                                    {['AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA',
                                      'PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
                                      .map(e => <div className="drop"
                                                        onClick={() => blindEffect(e)}>
                                                    {e}
                                                </div>)}
                                </div>
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
