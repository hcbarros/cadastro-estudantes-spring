
import Api from '../api/api';


export const editarMae = async (nome, cpf, datePay, student) => {

    if(!/\S/.test(nome.current.value) || !/\S/.test(cpf.current.value)) {
        alert("Informe nome e CPF!")
        return false;
    }
    if(cpf.current.value.length < 14) {
        alert("CPF inválido!");
        return false;
    }

    const d = new Date(datePay.current.value);

    if((d.valueOf()) < Date.now()) {
        alert("A data informada já passou!");
        return false;
    }

    student.student.mae.nome = nome.current.value;
    student.student.mae.cpf = cpf.current.value;
    student.student.mae.data_pagamento = d.valueOf();

    return await Api
            .updateStudant(student.student.id, student.student);
}