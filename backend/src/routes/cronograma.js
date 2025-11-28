import { Router } from 'express';
import { cronogramaEtapas } from '../controllers/data.js';

const router = Router();

router.get('/', (_req, res) => res.json(cronogramaEtapas));

router.post('/', (req, res) => {
  const novo = { id: cronogramaEtapas.length + 1, ...req.body };
  cronogramaEtapas.push(novo);
  res.status(201).json(novo);
});

export default router;
