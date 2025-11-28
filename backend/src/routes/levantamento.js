import { Router } from 'express';
import { funcionalidades } from '../controllers/data.js';

const router = Router();

router.get('/', (_req, res) => res.json(funcionalidades));

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = funcionalidades.findIndex((f) => f.id === Number(id));
  if (index === -1) return res.status(404).json({ message: 'Serviço não encontrado' });
  funcionalidades[index] = { ...funcionalidades[index], ...req.body };
  res.json(funcionalidades[index]);
});

export default router;
