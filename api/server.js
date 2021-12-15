import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors(), express.json(), express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));

  app.get('/', (req, res) => {
    res.json('Welcome to the backend in Development mode');
  });
}

app.get('/', (req, res) => {
  res.json('Hola mi gente');
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`.yellow.bold);
});
