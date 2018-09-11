const express = require('express');
const request = require('supertest')(express);

describe('#FuncionariosController', () => {
    it('#cadastro de produtos com dados invalidos', (done) =>{
        request.post('/funcionarios')
        .send({DataCad: "15/04/2017", Cargo: "", 
        cpf: "85235708709", Nome: "Aaron Aaberg", UfNasc: "AP", Salario: "8965.30", Status: "ATIVO"})
        .expect(400)
        .expect(function(res) {
            if (true) return console.log('Status esperado: 400');
            })
            .end(function(err, res){
                done(err);
            });
    });
});