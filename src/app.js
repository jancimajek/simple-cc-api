import express from 'express';
import bodyParser from 'body-parser';
import cards from './routes/cards';

const app = express();

app.use(bodyParser.json());
app.use('/cards', cards);

export default app;
