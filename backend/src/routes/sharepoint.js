import { Router } from 'express';
import { sharepointSites } from '../controllers/data.js';

const router = Router();

router.get('/', (_req, res) => res.json(sharepointSites));

router.post('/', (req, res) => {
  const novo = { id: sharepointSites.length + 1, ...req.body };
  sharepointSites.push(novo);
  res.status(201).json(novo);
});

export default router;
