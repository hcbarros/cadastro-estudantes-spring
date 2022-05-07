
import '../assets/css/index.css';
import loader from '../assets/images/loader.gif';
import React, { useState, useEffect, useRef } from 'react';
import {Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setStudent } from '../actions/actions';
import Header from '../components/header';
import { numberMask } from '../components/numberMask';
import Api from '../api/api';
import delet from '../assets/images/delete.png';
import edit from '../assets/images/edit.png';


export default function Main() {

    const dispatch = useDispatch();
    const [init, setInit] = useState(true);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [students, setStudents] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [local, setLocal] = useState(null);
    const input = useRef(null);


    const redirectTo = (local, obj) => {
        setLocal(local);
        if(local != 'cadastro') dispatch(setStudent(obj));
        setRedirect(true);
    }

    const deletar = async (id) => {
        setLoading(true);
        await Api.deleteStudant(id);
        await load(0);
    }

    const getDate = (miliseconds) => {
        let d = new Date(miliseconds)
                .toISOString().substring(0,10);
        const arr = d.split('-');
        return `${arr[2]}/${arr[1]}/${arr[0]}`;
    }

    const getPage = (value) => {
        const pages = Math.ceil(count/10);   
        if(pages > value) load(value);
        else alert(`Existem apenas ${pages} páginas para visualizar!`);
    }

    const advance = () => {
        if(input.current.value.length == 0) {
            alert("Informe o número da página!");
            return;
        }
        getPage(input.current.value - 1);
    }

    const load = async (page) => {
        setLoading(true);
        setPage(page);
        const stds = await Api.getStudants(page);        
        setStudents(stds);
        const total = await Api.count();
        setCount(total);
        setLoading(false);
    }

    useEffect(async () => {
         await load(0);   
    }, [init]);

    return (

        <div className="app">
            
            <Header />

            {redirect && <Redirect to={local} />}

            {loading && <div className="loading"><img src={loader} 
            alt="imagem gif carregando" /></div>}

            {!loading && 
            
            <table>
                <caption>Estudantes</caption>
                <tr>
                    <th>Nome</th>
                    <th>Data nasc</th>
                    <th>Série</th>
                    <th className="address-header">Endereço</th>
                    <th className="mother-header">Mãe</th>
                    <th colspan="2"><a onClick={() => 
                        redirectTo("cadastro", null)}>+</a></th>
                </tr>
                    {students.length > 0 && 
                    
                    students.map(s => 
                            <tr>
                                <td>{s.nome}</td>
                                <td>{getDate(s.data_nasc)}</td>
                                <td>{s.serie}</td>
                                <td className="address"><a href="#" 
                                    onClick={() => redirectTo("endereco", s)}
                                    >endereço</a></td>
                                <td className="mother"><a href="#" 
                                    onClick={() => redirectTo("mae", s)}
                                    >Mãe</a></td>
                                <td><img src={edit} onClick={() => redirectTo("estudante", s)} 
                                alt="imagem de lápis" /></td>
                                <td><img src={delet} onClick={() => deletar(s.id)}
                                alt="imagem de lixeira" /></td>
                            </tr>

                    )}
                
            </table>}

       {!loading && students.length > 0 && 
                    <div className="page-links">           

                        {page > 0 &&    
                        <div onClick={() => getPage(page - 1)} className="link-previous">
                        <div className="arrow"></div>Página anterior</div>}     

                        <div className={page > 0 ? "link-next" : "link-next-initial"} 
                        onClick={() => getPage(page + 1)}>
                        Próxima página<div className="arrow"></div></div>

                        <div className="avancar">Buscar página: 
                        <input type="text" ref={input} placeholder="Informe a página" 
                        onKeyUp={(evt) => numberMask(evt, true)} 
                        onKeyDown={(evt ) => numberMask(evt, true)} /> </div>       
                        <button onClick={() => advance()}>Avançar</button>
                    </div> } 

        </div>
    );
}