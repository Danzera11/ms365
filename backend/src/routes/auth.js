import { Router } from 'express';

const router = Router();

const users = [
  { id: 1, email: 'analista@nitro.com', senha: 'analista', papel: 'analista' },
  { id: 2, email: 'cliente@empresa.com', senha: 'cliente', papel: 'cliente' }
];

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = users.find((u) => u.email === email && u.senha === senha);
  if (!usuario) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  res.json({
    token: 'token-simulado',
    papel: usuario.papel,
    nome: usuario.email.split('@')[0]
  });
});

export default router;
