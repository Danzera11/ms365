import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';
import projetoRouter from './routes/projeto.js';
import usuariosRouter from './routes/usuarios.js';
import levantamentoRouter from './routes/levantamento.js';
import emailRouter from './routes/email.js';
import sharepointRouter from './routes/sharepoint.js';
import teamsRouter from './routes/teams.js';
import cronogramaRouter from './routes/cronograma.js';
import relatoriosRouter from './routes/relatorios.js';
import { auth } from './middleware/auth.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '../frontend');

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Static files
app.use(express.static(frontendPath));
app.use('/public', express.static(frontendPath));

// HTML entrypoints
app.get('/', (_req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

['dashboard', 'levantamento', 'sharepoint', 'teams', 'usuarios', 'cronograma', 'relatorios', 'email', 'orientacoes'].forEach(
  (page) => {
    app.get(`/${page}`, (_req, res) => {
      res.sendFile(path.join(frontendPath, `${page}.html`));
    });
  }
);

// API routes
app.use('/api/auth', authRouter);
app.use('/api/projeto', auth, projetoRouter);
app.use('/api/usuarios', auth, usuariosRouter);
app.use('/api/levantamento', auth, levantamentoRouter);
app.use('/api/email', auth, emailRouter);
app.use('/api/sharepoint', auth, sharepointRouter);
app.use('/api/teams', auth, teamsRouter);
app.use('/api/cronograma', auth, cronogramaRouter);
app.use('/api/relatorios', auth, relatoriosRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Portal Nitro server running on port ${port}`);
});
