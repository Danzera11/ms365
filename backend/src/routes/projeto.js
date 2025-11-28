import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { projetoResumo } from '../controllers/data.js';

const prisma = new PrismaClient();
const router = Router();

router.get('/', (_req, res) => {
  res.json(projetoResumo);
});

router.get('/atual', async (_req, res) => {
  try {
    const projeto = await prisma.projeto.findFirst({
      include: {
        funcionalidades: true,
        usuarios: true,
        emailConfig: true,
        sharepointSites: true,
        teamsConfig: true,
        teamsCriadas: true,
        cronograma: true,
        licenciamento: true,
        mapasAcesso: true,
        orientacoes: true
      }
    });

    if (!projeto) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    return res.json(projeto);
  } catch (error) {
    console.error('Erro ao buscar projeto atual', error);
    return res.status(500).json({ message: 'Erro interno ao buscar projeto' });
  }
});

export default router;
