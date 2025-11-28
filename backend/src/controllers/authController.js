import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
    }

    // Buscar analista pelo e-mail
    const user = await prisma.analyst.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    // Comparar senha com hash do banco
    const valid = await bcrypt.compare(senha, user.senha);

    if (!valid) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        sub: user.id,
        papel: user.papel,
        nome: user.nome
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      token,
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        papel: user.papel
      }
    });

  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
}

