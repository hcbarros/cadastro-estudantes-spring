
import axios from 'axios';


export default class Api {
      
        
    static async getStudant(id) {
          
          return await axios.get(`https://cadastro-estudantes.herokuapp.com/estudante/${id}`)
                .then(async (resp) => {
                      return await resp.data;
                })
                .catch(async (err) => {
                      return await err;
                });        
    }


    static async getStudants() {
          
          return await axios.get(`https://cadastro-estudantes.herokuapp.com/estudante`)
                .then(async (resp) => {
                    return await resp.data;
                })
                .catch(async (err) => {
                    return await err;
                });        
    }

   
    static async saveStudant(studant) {
          
        return await axios.post(`https://cadastro-estudantes.herokuapp.com/estudante`, 
              {
                nome: studant.nome,
                data_nasc: studant.data_nasc,
                serie: studant.serie,
                endereco: {
                    cep: studant.endereco.cep,
                    rua: studant.endereco.rua,
                    numero: studant.endereco.numero,
                    complemento: studant.endereco.complemento,
                    bairro: studant.endereco.bairro,
                    cidade: studant.endereco.cidade,
                    estado: studant.endereco.estado,
                },
                mae: {
                    nome: studant.mae.nome,
                    cpf: studant.mae.cpf,
                    data_pagamento: studant.mae.data_pagamento
                }  
              },
              {
              headers: {
                    "Content-Type": "application/json"
              }
              })
              .then(async (resp) => {
                    return await resp.data;
              })
              .catch(async (err) => {
                    return await err;
              });        
    }


    static async updateStudant(id, studant) {
          
        return await axios.put(`https://cadastro-estudantes.herokuapp.com/estudante/${id}`,
              {
                nome: studant.nome,
                data_nasc: studant.data_nasc,
                serie: studant.serie,
                endereco: {
                    id: studant.endereco.id,
                    cep: studant.endereco.cep,
                    rua: studant.endereco.rua,
                    numero: studant.endereco.numero,
                    complemento: studant.endereco.complemento,
                    bairro: studant.endereco.bairro,
                    cidade: studant.endereco.cidade,
                    estado: studant.endereco.estado,
                },
                mae: {
                    id: studant.mae.id,

                    nome: studant.mae.nome,
                    cpf: studant.mae.cpf,
                    data_pagamento: studant.mae.data_pagamento
                }  
              },
              {
              headers: {
                    "Content-Type": "application/json"
              }
              })
              .then(async (resp) => {
                    return await resp.data;
              })
              .catch(async (err) => {
                    return await err;
              });        
    }


    static async deleteStudant(id) {
          
        return await axios.delete(`https://cadastro-estudantes.herokuapp.com/estudante/${id}`)
              .then(async (resp) => {
                    return await resp.data;
              })
              .catch(async (err) => {
                    return await err;
              });        
    }

    
    static async getCEP(cep) {
          
        return await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
              .then(async (resp) => {
                    return await resp.data;
              })
              .catch(async (err) => {
                    return await err;
              });        
    }

}