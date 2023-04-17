import fetch from 'node-fetch';
import express from 'express';

const cepRouter = express.Router();

cepRouter.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;

    let url = `https://viacep.com.br/ws/${cep}/json/`;
    let options = { method: 'GET' };

    try {
        const a = await fetch(url, options);
        const b = await a.json();
        res.json(b);
    } catch (error) {
        res.json(error);
    }
});

export default cepRouter;