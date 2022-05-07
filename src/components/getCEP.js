
import Api from '../api/api';


export const getCEP = async (cep, rua, complemento, bairro, cidade) => {

    if(cep.current.value.length === 9) {
        const cepObj = await Api.getCEP(cep.current.value);        
        if(cepObj.cep) {
            rua.current.value = cepObj.logradouro;
            complemento.current.value = cepObj.complemento;
            bairro.current.value = cepObj.bairro;
            cidade.current.value = cepObj.localidade;
            return await cepObj
        }
        else {
            cep.current.value = "CEP invalido!"
            return false;
        }
    }
    else return false
} 