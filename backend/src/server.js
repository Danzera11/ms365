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

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/public', express.static(path.join(__dirname, '../../public')));

app.get('/', (_req, res) => {
  res.json({ status: 'Portal Nitro API online' });
});

app.use('/api/auth', authRouter);
app.use('/api/projeto', projetoRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/levantamento', levantamentoRouter);
app.use('/api/email', emailRouter);
app.use('/api/sharepoint', sharepointRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/cronograma', cronogramaRouter);
app.use('/api/relatorios', relatoriosRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Portal Nitro API listening on port ${port}`);
});
