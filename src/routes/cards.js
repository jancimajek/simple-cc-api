import express from 'express';
import Card from '../core/card';
import CardStore from '../core/cardStore';
import { createCardValidator, cardOperationValidator } from '../middleware/validators';

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

router.put(
  '/:name',
  cardOperationValidator(),
  (req, res) => {
    const { name } = req.params;
    const card = cardStore.get(name);

    const { operation, ammount } = req.body;
    const ammountNumber = Number.parseFloat(ammount.substring(1));
    const balance = card[operation](ammountNumber);

    const { number } = card;
    res.status(200).json({ number, balance });
  });

export default router;
