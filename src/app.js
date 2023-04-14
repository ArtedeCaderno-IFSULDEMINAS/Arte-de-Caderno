import express from 'express';
import dbConnect from './config/dbConnect.js'

dbConnect();

const app = express();
app.use(express.json());

export default app