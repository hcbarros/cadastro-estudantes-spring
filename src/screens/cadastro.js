
import loader from '../assets/images/loader.gif';
import '../assets/css/index.css';
import React, { useState, useEffect, useRef } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import {Redirect} from 'react-router-dom';
import $ from 'jquery';
import Header from '../components/header';
import Api from '../api/api';
import { numberMask } from '../components/numberMask';
import { cepMask } from '../components/cepMask';
import { cpfMask } from '../components/cpfMask';
import { validaCPF } from '../components/validaCPF';
import { getCEP } from '../components/getCEP';


export default function Cadastro() {

    const [init, setInit] = useState(true);
    const [state, setState] = useState("AC");
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useStateWithCallbackLazy(false);
    const nome = useRef(null);
    const serie = useRef(1);
    const dateNasc = useRef(null);
    const cep = useRef(null);
    const rua = useRef(null);
    const numero = useRef(null);
    const complemento = useRef(null);
    const bairro = useRef(null);
    const cidade = useRef(null);
    const nomeMae = useRef(null);
    const cpf = useRef(null);
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

        if(!/\S/.test(nome.current.value) || !/\S/.test(serie.current.value)) {
            alert("Informe nome e série!")
            return;
        }

        if(!/\S/.test(cep.current.value) || !/\S/.test(rua.current.value) || !/\S/.test(cidade.current.value)) {
            alert("Informe o CEP, rua e a cidade!")
            return;
        }

        const cpfValid = validaCPF(cpf.current.value);
        if(!cpfValid) {
            alert("CPF da mãe inválido!")
            return;    
        }

        const obj = await Api.getCEP(cep.current.value);
        if(!obj.cep) {
            alert("CEP inválido!");
            return;    
        }

        const nasc = new Date(dateNasc.current.value); 

        if(nasc.valueOf() > (Date.now() - 86400000)) {
            alert("Informe uma data de nascimento do passado!");
            return;
        }

        const pay = new Date(datePay.current.value); 

        if(pay.valueOf() < (Date.now() - 86400000)) {
            alert("Informe uma data futura para pagamento!");
            return;
        }

        const student = {};
        const endereco = {};
        const mae = {};

        student.nome = nome.current.value;
        student.serie = serie.current.value;
        student.data_nasc = nasc.valueOf();
        endereco.cep = cep.current.value;
        endereco.rua = rua.current.value;
        endereco.numero = numero.current.value;
        endereco.complemento = complemento.current.value;
        endereco.bairro = bairro.current.value;
        endereco.cidade = cidade.current.value;
        endereco.estado = state;
        mae.nome = nomeMae.current.value;
        mae.cpf = cpf.current.value;
        mae.data_pagamento = pay.valueOf();
        student.endereco = endereco;
        student.mae = mae;

        setLoading(true);
        const result = await Api.saveStudant(student);

        if(result.nome) setRedirect(true);
        setLoading(false, () => alert("Erro ao salvar os dados!"));
    }


    const getInput = (label, max, ref) => {
        return  <tr>
                    <td><b>{label}</b></td>
                    <td className="field-input">
                        <input type={max == null ? "date" : "text"}  
                        maxLength={max} ref={ref} />
                    </td>    
                </tr>    
    }

    useEffect(() => {$(".drop").hide()},[init, loading])
    
    useEffect(() => {
        
        datePay.current.value = new Date()
                            .toISOString().substring(0,10);
        dateNasc.current.value = new Date()
                            .toISOString().substring(0,10);                            
    }, [init]);


    return (

        <div className="cadastro">
            
            <Header />

            {redirect && <Redirect to="/" />}

            {loading && <div className="loading"><img src={loader} 
            alt="imagem gif carregando" /></div>}

            {!loading &&

            <div>

                <div className="text-editar">Cadastrar</div>
                <fieldset>
                    <legend>Estudante:</legend>

                    <table>

                        {getInput("Nome:", 100, nome)}
                        {getInput("Data de nascimento:", null, dateNasc)}      
                                    
                        <tr>
                            <td><b>Série:</b></td>
                            <td className="field-input">
                                <input type="text" onKeyUp={(evt) => numberMask(evt,true)} 
                                onKeyDown={(evt) => numberMask(evt,true)} maxLength="1" ref={serie} />
                            </td>    
                        </tr>   
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

                        {getInput("Nome da mãe:", 100, nomeMae)}
                       
                        <tr>
                            <td><b>CPF da mãe:</b></td>
                            <td className="field-input">
                                <input type="text" onKeyUp={(evt) => cpfMask(evt)} 
                                onKeyDown={(evt) => cpfMask(evt)} maxLength="14" ref={cpf} />
                            </td>    
                        </tr>   

                        {getInput("Data de pagamento:", null, datePay)}
                                           
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