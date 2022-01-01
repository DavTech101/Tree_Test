import path from 'path';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import dataRoutes from './routes/dataRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
const __dirname = path.resolve();
app.use(cors(), express.json(), express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));

    app.get('/', (req, res) => {
        res.json('Welcome to the Development API');
    });
}

app.get('/', (req, res) => {
    res.json('Hola mi gente');
});

app.get('/api', (req, res) => {
    res.json('Hola api gente');
});

app.use('/api/data', dataRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(`${__dirname}/client/dist`));

    app.get('*', (req, res) => {
        res.sendFile(`${__dirname}/client/dist/public/index.html`);
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`.yellow.bold);
});