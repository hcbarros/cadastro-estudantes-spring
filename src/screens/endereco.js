
import '../assets/css/index.css';
import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Api from '../api/api';


export default function Endereco() {


    const [init, setInit] = useState(true);
    const [studants, setStudants] = useState([]);
        

    useEffect(() => {

        const stds = Api.getStudants();
        setStudants(stds);
    }, [init]);

    return (

        <div className="app">
            
            <Header />

            <table>
                <tr>
                    <th>Nome</th>
                    <th>Data nasc</th>
                    <th>Série</th>
                    <th>Série</th>
                    <th>Série</th>
                </tr>


            </table>


        </div>
    );
}