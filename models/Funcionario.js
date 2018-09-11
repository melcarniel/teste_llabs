const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criar Schema
const FuncionarioSchema = new Schema ({
    DataCad: {type: Date, default: Date.now},
    Cargo: {type: String, required: true},
    cpf: {type: String, required: true},
    Nome: {type: String, required: true},
    UfNasc: {type: String, required: true},
    Salario: {type: Number, required: true},
    Status: {type: String, required: true}
});

mongoose.model('funcionarios', FuncionarioSchema);