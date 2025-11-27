import { Router } from 'express';
import { usuarios } from '../controllers/data.js';

const router = Router();

router.get('/', (_req, res) => res.json(usuarios));

router.post('/', (req, res) => {
  const novo = { id: usuarios.length + 1, ...req.body };
  usuarios.push(novo);
  res.status(201).json(novo);
});

export default router;
