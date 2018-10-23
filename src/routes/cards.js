import express from 'express';
import CardStore from '../core/cardStore';

const router = express.Router();
const cardStore = new CardStore();

router.get('/', (req, res) => {
  res.send(cardStore.getAll());
});

export default router;
