-- CreateTable
CREATE TABLE "Projeto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "descricao" TEXT,
    "status" TEXT NOT NULL DEFAULT 'planejamento',
    "progresso" INTEGER NOT NULL DEFAULT 0,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analyst" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "papel" TEXT NOT NULL DEFAULT 'analista',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analyst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dominio" TEXT NOT NULL,
    "segmento" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecisionLog" (
    "id" TEXT NOT NULL,
    "analistaId" TEXT NOT NULL,
    "deploymentId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DecisionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogProjeto" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogProjeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deployment" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "modelSelected" TEXT NOT NULL,
    "licensing" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'planejamento',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deployment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Levantamento" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "criticidade" TEXT NOT NULL,
    "tempoEstimado" INTEGER NOT NULL,
    "selecionado" BOOLEAN NOT NULL DEFAULT false,
    "observacoes" TEXT,

    CONSTRAINT "Levantamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "departamento" TEXT,
    "cargo" TEXT,
    "email" TEXT NOT NULL,
    "caixaMB" INTEGER,
    "officeLocal" BOOLEAN NOT NULL DEFAULT false,
    "migrarEmail" BOOLEAN NOT NULL DEFAULT false,
    "oneDrive" BOOLEAN NOT NULL DEFAULT false,
    "sharePoint" BOOLEAN NOT NULL DEFAULT false,
    "teams" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailConfig" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "plataformaOrigem" TEXT NOT NULL,
    "metodologia" TEXT,
    "janelaMigracao" TEXT,
    "volumeTotalMB" INTEGER,
    "migrarCalendarios" BOOLEAN NOT NULL DEFAULT true,
    "migrarContatos" BOOLEAN NOT NULL DEFAULT true,
    "backupPst" BOOLEAN NOT NULL DEFAULT false,
    "caixasCompartilhadas" TEXT,
    "gruposDistribuicao" TEXT,
    "observacoes" TEXT,

    CONSTRAINT "EmailConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharePointSite" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "proposito" TEXT,
    "proprietarios" TEXT,
    "membros" TEXT,
    "nivelAcesso" TEXT,
    "volumeGB" DOUBLE PRECISION,
    "pastaOrigem" TEXT,

    CONSTRAINT "SharePointSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamsConfig" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "nomeEquipe" TEXT,
    "tipoEquipe" TEXT,
    "proposito" TEXT,
    "proprietarios" TEXT,
    "membrosIniciais" TEXT,
    "canais" TEXT,
    "recursos" TEXT,
    "observacoes" TEXT,

    CONSTRAINT "TeamsConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CronogramaItem" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "responsavel" TEXT,
    "inicio" TIMESTAMP(3),
    "fim" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'não iniciado',
    "ordem" INTEGER,

    CONSTRAINT "CronogramaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licenciamento" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "m365basic" INTEGER DEFAULT 0,
    "m365standard" INTEGER DEFAULT 0,
    "appsforbusiness" INTEGER DEFAULT 0,
    "f3" INTEGER DEFAULT 0,
    "e3" INTEGER DEFAULT 0,
    "e5" INTEGER DEFAULT 0,
    "observacoes" TEXT,

    CONSTRAINT "Licenciamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orientacao" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "teams" TEXT,
    "sharepoint" TEXT,
    "emails" TEXT,
    "licencas" TEXT,
    "seguranca" TEXT,
    "governance" TEXT,

    CONSTRAINT "Orientacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analyst_email_key" ON "Analyst"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_dominio_key" ON "Client"("dominio");

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfig_projetoId_key" ON "EmailConfig"("projetoId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamsConfig_projetoId_key" ON "TeamsConfig"("projetoId");

-- CreateIndex
CREATE UNIQUE INDEX "Licenciamento_projetoId_key" ON "Licenciamento"("projetoId");

-- CreateIndex
CREATE UNIQUE INDEX "Orientacao_projetoId_key" ON "Orientacao"("projetoId");

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionLog" ADD CONSTRAINT "DecisionLog_analistaId_fkey" FOREIGN KEY ("analistaId") REFERENCES "Analyst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionLog" ADD CONSTRAINT "DecisionLog_deploymentId_fkey" FOREIGN KEY ("deploymentId") REFERENCES "Deployment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogProjeto" ADD CONSTRAINT "LogProjeto_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deployment" ADD CONSTRAINT "Deployment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Levantamento" ADD CONSTRAINT "Levantamento_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailConfig" ADD CONSTRAINT "EmailConfig_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharePointSite" ADD CONSTRAINT "SharePointSite_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsConfig" ADD CONSTRAINT "TeamsConfig_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CronogramaItem" ADD CONSTRAINT "CronogramaItem_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licenciamento" ADD CONSTRAINT "Licenciamento_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orientacao" ADD CONSTRAINT "Orientacao_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
