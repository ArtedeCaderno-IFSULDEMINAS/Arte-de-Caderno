import express from 'express';
import validarCpf from 'validar-cpf';

const validatorCpfRoute = express.Router();

validatorCpfRoute.get('/cpf/:cpf', (req, res) => {
    const { cpf } = req.params;

    const valid = validarCpf(cpf);

    if(valid){
        return res.status(200).json({ valid });
    }
    return res.status(400).json({ valid });
    
});

export default validatorCpfRoute;
