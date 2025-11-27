import { Router } from 'express';
import { projetoResumo } from '../controllers/data.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(projetoResumo);
});

export default router;
