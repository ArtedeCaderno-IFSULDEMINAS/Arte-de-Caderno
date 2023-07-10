import express from 'express';
import dbConnect from './config/dbConnect.js';
import routes from './routes/index.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

dbConnect();

const app = express();
app.use(cors());
app.use(express.json());
routes(app);

app.use(errorHandler);

export default app