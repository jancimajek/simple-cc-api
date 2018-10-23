import express from 'express';
import bodyParser from 'body-parser';
import cards from './routes/cards';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(bodyParser.json());
app.use('/cards', cards);
app.use(errorHandler);

export default app;
