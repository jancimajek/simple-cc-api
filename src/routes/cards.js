import express from 'express';
import Card from '../core/card';
import CardStore from '../core/cardStore';
import { createCardValidator } from '../middleware/validators';

const router = express.Router();
const cardStore = new CardStore();

router.get('/', (req, res) => {
  res.send(cardStore.getAll());
});

router.post(
  '/',
  createCardValidator(),
  (req, res) => {
    const { name, number, limit } = req.body;
    const limitNumber = Number.parseFloat(limit.substring(1));
    const card = new Card(name, Number.parseInt(number, 10), limitNumber);
    cardStore.add(card);
    res.sendStatus(201);
  });

export default router;
