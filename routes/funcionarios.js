const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Carregar model funcionario
require('../models/Funcionario')
const Funcionario = mongoose.model('funcionarios');


//cadastrar funcionario
router.get('/cadastrar', (req, res) => {
    res.render('funcionarios/cadastrar');
});

//atualizar funcionario
router.get('/atualizar/:id', (req, res) => {
    Funcionario.findOne({
        _id: req.params.id
    })
    .then(funcionario => {
        res.render('funcionarios/atualizar', {
            funcionario: funcionario
        });
    });
    
});

//metodo put atualizar
router.put('/todos/:id', (req, res) => {
    Funcionario.findOne({
        _id: req.params.id
    })
    .then(funcionario => {
        //novos valores
        funcionario.Cargo = req.body.Cargo;
        funcionario.cpf = req.body.cpf;
        funcionario.Nome = req.body.Nome;
        funcionario.UfNasc = req.body.UfNasc;
        funcionario.Salario = req.body.Salario;
        funcionario.Status = req.body.Status;

        funcionario.save()
            .then(funcionario => {
                res.redirect('/funcionarios/todos');
            })

    });
});

//excluir funcionario
router.delete('/todos/:id', (req, res) => {
    Funcionario.remove({_id: req.params.id})
        .then(() => {
            res.redirect('/funcionarios/todos');
        });
});

//localizar funcionario
router.get('/localizar', (req, res) => {
    res.render('funcionarios/localizar');
});

//localizar todos
router.get('/todos', (req, res) => {
    Funcionario.find({}).sort({date: 'desc'})
    .then(funcionarios => {
        res.render('funcionarios/todos', {
            funcionarios: funcionarios
        });
    });
    
});

//Localizar por nome
router.get('/search', (req, res) => {
     Funcionario.find({ 
         Nome: new RegExp(req.query.Nome, 'i') })
     .then(funcionarios => {
        res.render('funcionarios/search', {
            funcionarios: funcionarios
        });
    });
});

router.get('/nome', (req, res) => {
    res.render('funcionarios/nome');
});

//Localizar por cpf
router.get('/searchcpf', (req, res) => {
    Funcionario.findOne({ 
        cpf: req.query.cpf})
    .then(funcionario => {
        res.render('funcionarios/searchcpf', {
           funcionario: funcionario
       });
   });
});

router.get('/cpf', (req, res) => {
   res.render('funcionarios/cpf');
});

//Localizar por cargo
router.get('/searchcargo', (req, res) => {
    Funcionario.find({ 
        Cargo: req.query.Cargo})
    .then(funcionarios => {
        res.render('funcionarios/searchcargo', {
           funcionarios: funcionarios
       });
   });
});

router.get('/cargo', (req, res) => {
   res.render('funcionarios/cargo');
});

//Localizar por status
router.get('/searchstatus', (req, res) => {
    Funcionario.find({ 
        Status: req.query.Status})
    .then(funcionarios => {
        res.render('funcionarios/searchstatus', {
           funcionarios: funcionarios
       });
   });
});

router.get('/status', (req, res) => {
   res.render('funcionarios/status');
});

//Localizar por uf
router.get('/searchuf', (req, res) => {
    Funcionario.find({ 
        UfNasc: req.query.UfNasc})
    .then(funcionarios => {
        res.render('funcionarios/searchuf', {
           funcionarios: funcionarios
       });
   });
});

router.get('/uf', (req, res) => {
   res.render('funcionarios/uf');
});

//Localizar por salario
router.get('/searchsalario', (req, res) => {
    Funcionario.find({ 
        Salario: { $gt: req.query.valor1, $lt: req.query.valor2 }})
    .then(funcionarios => {
        res.render('funcionarios/searchsalario', {
           funcionarios: funcionarios
       });
   });
});

router.get('/salario', (req, res) => {
   res.render('funcionarios/salario');
});


//post funcionario
router.post('/principal', (req, res) => {
    const newFuncionario = {
        Cargo: req.body.Cargo,
        cpf: req.body.cpf,
        Nome: req.body.Nome,
        UfNasc: req.body.UfNasc,
        Salario: req.body.Salario,
        Status: req.body.Status
    }

    new Funcionario(newFuncionario)
        .save()
        .then(funcionario => {
            res.redirect('/principal')
        })
});

module.exports = router;