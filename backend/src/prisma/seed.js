import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash('analista', 10);

  await prisma.analyst.upsert({
    where: { email: 'analista@nitro.com' },
    update: {},
    create: {
      nome: 'Analista Nitro',
      email: 'analista@nitro.com',
      senha: senhaHash,
      papel: 'analista'
    }
  });

  const projeto = await prisma.projeto.upsert({
    where: { id: 1 },
    update: {},
    create: {
      empresa: 'Cliente Exemplo S.A.',
      inicio: new Date('2024-05-01'),
      fim: new Date('2024-07-31'),
      status: 'Em andamento',
      percentualConcluido: 62,
      licenciamento: {
        create: [
          { tipo: 'E3', quantidade: 120 },
          { tipo: 'E5', quantidade: 40 },
          { tipo: 'Business Standard', quantidade: 60 }
        ]
      },
      emailConfig: {
        create: {
          plataformaOrigem: 'Exchange On-Premises',
          metodologia: 'Híbrido Cutover',
          janelaPreferida: 'Noites e finais de semana',
          volumeTotalGb: 420,
          componentes: ['Calendários', 'Contatos', 'Tarefas', 'Assinaturas'],
          caixasCompartilhadas: 12,
          gruposDistribuicao: 18,
          observacoes: 'Endereçar delegações complexas e compliance.'
        }
      },
      teamsConfig: {
        create: {
          nomenclatura: 'Utilizar padrão: DEPARTAMENTO - Tópico',
          limites: 'Evitar mais de 200 canais por equipe, arquivar canais inativos.',
          governanca: 'Habilitar expiração automática e proprietários múltiplos.',
          backups: 'Configurar retenção conforme LGPD e compliance.',
          seguranca: 'MFA obrigatório e políticas DLP aplicadas.'
        }
      }
    }
  });

  await prisma.funcionalidade.createMany({
    data: [
      {
        nome: 'Exchange Online',
        categoria: 'Comunicação',
        criticidade: 'Alta',
        tempoEstimadoSemanas: 2,
        selecionado: true,
        observacoes: 'Prioridade para times executivos.',
        projetoId: projeto.id
      },
      {
        nome: 'SharePoint Online',
        categoria: 'Colaboração',
        criticidade: 'Alta',
        tempoEstimadoSemanas: 3,
        selecionado: true,
        observacoes: 'Revisar governança e nomenclatura de sites.',
        projetoId: projeto.id
      }
    ],
    skipDuplicates: true
  });

  await prisma.usuario.createMany({
    data: [
      {
        nome: 'Ana Ribeiro',
        departamento: 'TI',
        cargo: 'Analista Sênior',
        email: 'ana.ribeiro@example.com',
        tamanhoCaixaGb: 18,
        officeLocal: true,
        migrarEmail: true,
        oneDrive: true,
        sharePoint: true,
        teams: true,
        projetoId: projeto.id
      },
      {
        nome: 'Carlos Lima',
        departamento: 'Financeiro',
        cargo: 'Coordenador',
        email: 'carlos.lima@example.com',
        tamanhoCaixaGb: 12,
        officeLocal: false,
        migrarEmail: true,
        oneDrive: true,
        sharePoint: false,
        teams: true,
        projetoId: projeto.id
      }
    ],
    skipDuplicates: true
  });

  await prisma.sharePointSite.create({
    data: {
      tipo: 'Comunicação',
      nome: 'Intranet Corporativa',
      proposito: 'Comunicação institucional e notícias',
      proprietarios: ['TI', 'Comunicação'],
      membros: ['Toda a empresa'],
      nivel: 'Organização',
      volumeDadosGb: 250,
      pastaOrigem: 'NAS/PortalAntigo',
      recomendacoes: 'Aplicar governança de metadados e centralizar políticas de retenção.',
      projetoId: projeto.id
    }
  });

  await prisma.teamsCriada.create({
    data: {
      nome: 'Projeto ERP',
      tipo: 'Projeto',
      proposito: 'Colaboração entre times TI e Negócios',
      proprietarios: ['Ana Ribeiro'],
      membros: ['Equipe TI', 'Financeiro'],
      canais: ['Geral', 'Governança', 'Treinamentos'],
      recursos: ['Reuniões', 'Apps', 'Arquivos'],
      observacoes: 'Criar canal privado para diretoria.',
      projetoId: projeto.id
    }
  });

  await prisma.cronogramaEtapa.createMany({
    data: [
      {
        nome: 'Kickoff',
        responsavel: 'PMO',
        inicio: new Date('2024-05-01'),
        fim: new Date('2024-05-05'),
        duracaoDias: 5,
        status: 'Concluído',
        projetoId: projeto.id
      },
      {
        nome: 'Config tenant',
        responsavel: 'TI',
        inicio: new Date('2024-05-06'),
        fim: new Date('2024-05-20'),
        duracaoDias: 14,
        status: 'Em andamento',
        projetoId: projeto.id
      }
    ],
    skipDuplicates: true
  });

  await prisma.mapaAcesso.createMany({
    data: [
      { recurso: 'E-mail', acesso: 'MFA + DLP', projetoId: projeto.id },
      { recurso: 'SharePoint', acesso: 'Sensibilidade e versionamento', projetoId: projeto.id }
    ]
  });

  await prisma.orientacao.createMany({
    data: [
      { titulo: 'Governança SharePoint', conteudo: 'Use sites por departamento e aplique rótulos de sensibilidade.', projetoId: projeto.id },
      { titulo: 'Boas práticas Teams', conteudo: 'Limite canais e defina proprietários múltiplos.', projetoId: projeto.id }
    ]
  });

  console.log('Seed concluído.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
