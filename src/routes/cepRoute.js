import fetch from "node-fetch";
import express from "express";
import Log from "../models/log.js.js";

const cepRoute = express.Router();

cepRoute.get("/cep/:cep", async (req, res) => {
  const { cep } = req.params;

  let url = `https://viacep.com.br/ws/${cep}/json/`;
  let options = { method: "GET" };

  try {
    const a = await fetch(url, options);
    const b = await a.json();
    res.json(b);
  } catch (error) {
    Log.create({
      message: error.message,
      stack: error.stack,
      date: new Date(),
      type: LOG_TYPES.ERROR,
    });
    res.json(error);
  }
});

export default cepRoute;
