
import '../assets/css/index.css';
import loader from '../assets/images/loader.gif';
import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setStudent } from '../actions/actions';
import Header from '../components/header';
import Api from '../api/api';
import delet from '../assets/images/delete.png';
import edit from '../assets/images/edit.png';


export default function Main() {

    const dispatch = useDispatch();
    const [init, setInit] = useState(true);
    const [studants, setStudants] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [local, setLocal] = useState(null);


    const redirectTo = (local, obj) => {
        setLocal(local);
        dispatch(setStudent(obj));
        setRedirect(true);
    }

    const getDate = (miliseconds) => {
        let d = new Date(miliseconds)
                .toISOString().substring(0,10);
        const arr = d.split('-');
        return `${arr[2]}/${arr[1]}/${arr[0]}`;
    }

    useEffect(async () => {

        const stds = await Api.getStudants();        
        setStudants(stds);
        setLoading(false);
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
                    <th>Endereço</th>
                    <th>Mãe</th>
                    <th/>
                    <th/>
                </tr>
                    {studants.map(s => 
                            <tr>
                                <td>{s.nome}</td>
                                <td>{getDate(s.data_nasc)}</td>
                                <td>{s.serie}</td>
                                <td><a href="#" 
                                    onClick={() => redirectTo("endereco", s)}
                                    >endereço</a></td>
                                <td><a href="#" 
                                    onClick={() => redirectTo("mae", s)}
                                    >Mãe</a></td>
                                <td><img src={edit} onClick={() => redirectTo("estudante", s)} 
                                alt="imagem de lápis" /></td>
                                <td><img src={delet} alt="imagem de lixeira" /></td>
                            </tr>

                    )}
                
            </table>}

        </div>
    );
}