
import '../assets/css/index.css';
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
    const [local, setLocal] = useState(null);


    const redirectTo = (local, obj) => {
        setLocal(local);
        dispatch(setStudent(obj));
        setRedirect(true);
    }

    const getDate = (miliseconds) => {
        let d = new Date(miliseconds);
        return d.toLocaleDateString();
    }

    useEffect(async () => {

        const stds = await Api.getStudants();        
        setStudants(stds);
    }, [init]);

    return (

        <div className="app">
            
            <Header />

            {redirect && <Redirect to={local} />}

            <table>
                <caption>Estudantes</caption>
                <tr>
                    <th>Nome</th>
                    <th>Data nasc</th>
                    <th>Série</th>
                    <th>Endereço</th>
                    <th>Mãe</th>
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
                                <td><img src={edit} alt="imagem de lápis" /></td>
                                <td><img src={delet} alt="imagem de lixeira" /></td>
                            </tr>

                    )}
                
            </table>

        </div>
    );
}