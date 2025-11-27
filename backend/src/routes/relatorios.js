import { Router } from 'express';
import { relatorios } from '../controllers/data.js';

const router = Router();

router.get('/', (_req, res) => res.json(relatorios));

export default router;
