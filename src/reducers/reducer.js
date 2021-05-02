
import {combineReducers} from 'redux';


export const STUDENT = 'student';

const inicialState = {
    id: 1,
    nome: '',
    data_nasc: 1321239600000,
    serie: 1,
    endereco: {
        id: 2,
        cep: '00100-050',
        rua: '',
        numero: 0,
        complemento: null,
        bairro: '',
        cidade: '',
        estado: ''
    },
    "mae": {
        id: 3,
        nome: '',
        cpf: '965.678.390-58',
        data_pagamento: 1617505200000
    }
}


const student = (state = {student: inicialState}, action) => {
    return action.type === STUDENT ? 
          { ...state, student: action.payload } : state;            
}


const reducer = combineReducers({
    student
});

export default reducer;
