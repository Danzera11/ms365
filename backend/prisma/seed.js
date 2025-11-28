import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando Seed do Portal Nitro...");

  // Analista padrão
  const senhaHash = await bcrypt.hash("analista", 10);

  await prisma.analyst.upsert({
    where: { email: "analista@nitro.com" },
    update: {},
    create: {
      nome: "Analista Nitro",
      email: "analista@nitro.com",
      senha: senhaHash,
      papel: "analista",
    }
  });

  console.log("✓ Analista criado.");
  console.log("🌱 Seed finalizado!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error("❌ Erro no seed:", e);
    prisma.$disconnect();
    process.exit(1);
  });

