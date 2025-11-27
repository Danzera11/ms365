import { Router } from 'express';
import { teamsConfigs } from '../controllers/data.js';

const router = Router();

router.get('/', (_req, res) => res.json(teamsConfigs));

router.post('/', (req, res) => {
  const novo = { id: teamsConfigs.equipes.length + 1, ...req.body };
  teamsConfigs.equipes.push(novo);
  res.status(201).json(novo);
});

export default router;
