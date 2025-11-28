// Dados estáticos para prototipação da API Nitro
export const projetoResumo = {
  id: 1,
  empresa: 'Cliente Exemplo S.A.',
  inicio: '2024-05-01',
  fim: '2024-07-31',
  status: 'Em andamento',
  percentualConcluido: 62,
  modulos: [
    { nome: 'Usuários', progresso: 80 },
    { nome: 'E-mail', progresso: 60 },
    { nome: 'SharePoint', progresso: 55 },
    { nome: 'Teams', progresso: 70 },
    { nome: 'Cronograma', progresso: 45 }
  ],
  licenciamento: [
    { tipo: 'E3', quantidade: 120 },
    { tipo: 'E5', quantidade: 40 },
    { tipo: 'Business Standard', quantidade: 60 }
  ],
  entregas: [
    { nome: 'Kickoff', status: 100 },
    { nome: 'Configuração do tenant', status: 90 },
    { nome: 'Treinamentos', status: 70 },
    { nome: 'Migração de caixas', status: 40 },
    { nome: 'Pós-implantação', status: 20 }
  ]
};

export const funcionalidades = [
  {
    id: 1,
    nome: 'Exchange Online',
    categoria: 'Comunicação',
    criticidade: 'Alta',
    tempoEstimadoSemanas: 2,
    selecionado: true,
    observacoes: 'Prioridade para times executivos.'
  },
  {
    id: 2,
    nome: 'SharePoint Online',
    categoria: 'Colaboração',
    criticidade: 'Alta',
    tempoEstimadoSemanas: 3,
    selecionado: true,
    observacoes: 'Revisar governança e nomenclatura de sites.'
  },
  {
    id: 3,
    nome: 'Teams Voz',
    categoria: 'Comunicação',
    criticidade: 'Média',
    tempoEstimadoSemanas: 4,
    selecionado: false,
    observacoes: 'Disponibilizar para diretoria no piloto.'
  }
];

export const usuarios = [
  {
    id: 1,
    nome: 'Ana Ribeiro',
    departamento: 'TI',
    cargo: 'Analista Sênior',
    email: 'ana.ribeiro@example.com',
    tamanhoCaixaGb: 18,
    officeLocal: true,
    migrarEmail: true,
    oneDrive: true,
    sharePoint: true,
    teams: true
  },
  {
    id: 2,
    nome: 'Carlos Lima',
    departamento: 'Financeiro',
    cargo: 'Coordenador',
    email: 'carlos.lima@example.com',
    tamanhoCaixaGb: 12,
    officeLocal: false,
    migrarEmail: true,
    oneDrive: true,
    sharePoint: false,
    teams: true
  }
];

export const emailConfig = {
  plataformaOrigem: 'Exchange On-Premises',
  metodologia: 'Híbrido Cutover',
  janelaPreferida: 'Noites e finais de semana',
  volumeTotalGb: 420,
  componentes: ['Calendários', 'Contatos', 'Tarefas', 'Assinaturas'],
  caixasCompartilhadas: 12,
  gruposDistribuicao: 18,
  observacoes: 'Endereçar delegações complexas e compliance.'
};

export const sharepointSites = [
  {
    id: 1,
    tipo: 'Comunicação',
    nome: 'Intranet Corporativa',
    proposito: 'Comunicação institucional e notícias',
    proprietarios: ['TI', 'Comunicação'],
    membros: ['Toda a empresa'],
    nivel: 'Organização',
    volumeDadosGb: 250,
    pastaOrigem: 'NAS/PortalAntigo',
    recomendacoes: 'Aplicar governança de metadados e centralizar políticas de retenção.'
  }
];

export const teamsConfigs = {
  boasPraticas: {
    nomenclatura: 'Utilizar padrão: DEPARTAMENTO - Tópico',
    limites: 'Evitar mais de 200 canais por equipe, arquivar canais inativos.',
    governanca: 'Habilitar expiração automática e proprietários múltiplos.',
    backups: 'Configurar retenção conforme LGPD e compliance.',
    seguranca: 'MFA obrigatório e políticas DLP aplicadas.'
  },
  equipes: [
    {
      id: 1,
      nome: 'Projeto ERP',
      tipo: 'Projeto',
      proposito: 'Colaboração entre times TI e Negócios',
      proprietarios: ['Ana Ribeiro'],
      membros: ['Equipe TI', 'Financeiro'],
      canais: ['Geral', 'Governança', 'Treinamentos'],
      recursos: ['Reuniões', 'Apps', 'Arquivos'],
      observacoes: 'Criar canal privado para diretoria.'
    }
  ]
};

export const cronogramaEtapas = [
  {
    id: 1,
    nome: 'Kickoff',
    responsavel: 'PMO',
    inicio: '2024-05-01',
    fim: '2024-05-05',
    duracaoDias: 5,
    status: 'Concluído'
  },
  {
    id: 2,
    nome: 'Config tenant',
    responsavel: 'TI',
    inicio: '2024-05-06',
    fim: '2024-05-20',
    duracaoDias: 14,
    status: 'Em andamento'
  }
];

export const relatorios = {
  licencas: projetoResumo.licenciamento,
  statusServicos: funcionalidades,
  cronograma: cronogramaEtapas,
  mapaAcesso: [
    { recurso: 'E-mail', acesso: 'MFA + DLP' },
    { recurso: 'SharePoint', acesso: 'Sensibilidade e versionamento' }
  ],
  resumoExecutivo: 'Projeto dentro do prazo, riscos controlados e comunicação ativa com stakeholders.',
  recomendacoes: [
    'Ativar políticas de retenção para todas as equipes Teams.',
    'Mapear pastas críticas antes da migração de arquivos.',
    'Validar sincronização do diretório antes do cutover de e-mail.'
  ],
  logs: [
    { data: '2024-06-01', evento: 'Sincronização AD concluída' },
    { data: '2024-06-05', evento: 'Piloto de Teams Voz iniciado' }
  ]
};
