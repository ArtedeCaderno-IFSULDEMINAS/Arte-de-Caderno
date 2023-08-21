import express from 'express';
import Login from '../models/login.js';
import validarCpf from 'validar-cpf';

const validatorCpfRoute = express.Router();

validatorCpfRoute.get('/cpf/:cpf', (req, res) => {
    const { cpf } = req.params;

    let userExists = Login.find({username: cpf});

    if(userExists !== null){
        return res.status(400).json({message: 'User already exists'});
    }

    const valid = validarCpf(cpf);

    if(valid){
        return res.status(200).json({ valid });
    }
    return res.status(400).json({ valid });
    
});

export default validatorCpfRoute;
