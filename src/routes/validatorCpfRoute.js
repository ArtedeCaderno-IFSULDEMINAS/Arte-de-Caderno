import express from 'express';
import Login from '../models/login.js';
import validarCpf from 'validar-cpf';
import { ERROR_MESSAGE } from '../constants/Messages.js';

const validatorCpfRoute = express.Router();

validatorCpfRoute.get('/cpf/:cpf', async (req, res) => {
    const { cpf } = req.params;
    
    const userExists = await Login.findOne({username: cpf.replace(/\D/g, "")});

    if(userExists !== null){
        return res.status(400).json({message: ERROR_MESSAGE.USER_ALREADY_EXISTS});
    }

    const valid = validarCpf(cpf);

    if(valid){
        return res.status(200).json({ valid });
    }
    return res.status(400).json({ valid });
    
});

export default validatorCpfRoute;
