import { Router } from 'express';
import { emailConfig } from '../controllers/data.js';

const router = Router();

router.get('/', (_req, res) => res.json(emailConfig));

router.put('/', (req, res) => {
  Object.assign(emailConfig, req.body);
  res.json(emailConfig);
});

export default router;
