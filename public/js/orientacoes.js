import { exigirLogin } from './auth.js';
import { renderLayout, renderMenu } from './ui.js';

const orientacoes = [
  {
    titulo: 'Recomendações SharePoint',
    conteudo: 'Estruture sites por departamento, aplique rótulos de sensibilidade e habilite versionamento obrigatório.'
  },
  { titulo: 'Estrutura ideal por departamento', conteudo: 'Use modelos consistentes de bibliotecas, permissões herdadas e metadados padronizados.' },
  { titulo: 'Como criar equipes', conteudo: 'Defina propósito claro, proprietários múltiplos e canais alinhados a áreas de trabalho.' },
  { titulo: 'Governança', conteudo: 'Políticas de expiração, retenção, DLP e MFA em todos os usuários.' },
  { titulo: 'Segurança', conteudo: 'Habilite CAE, bloqueio de sessão arriscada e monitoramento contínuo.' },
  { titulo: 'Ativação Office local', conteudo: 'Distribua pelo Intune ou GPO com chave MAK/KMS e telemetria habilitada.' },
  { titulo: 'Tipos de licenças', conteudo: 'Combine E3/E5 conforme perfis; garanta licenças para serviços críticos como Teams Voz e Compliance.' },
  { titulo: 'Metodologia de migração', conteudo: 'Planeje piloto, valide DNS, execute cutover com comunicação clara e janelas aprovadas.' },
  { titulo: 'Melhores práticas Teams', conteudo: 'Limite canais, use tags, padronize nomenclatura e habilite políticas de retenção.' },
  { titulo: 'OneDrive policies', conteudo: 'Configurar Known Folder Move, limites de compartilhamento e retenção pós-offboarding.' },
  { titulo: 'Estruturar canais', conteudo: 'Canais padrão para comunicação geral, privados para temas sensíveis e compartilhados para parceiros.' },
  { titulo: 'Organização de sites', conteudo: 'Use hubs para navegação, sites comunicativos para notícias e sites de equipe para colaboração.' },
  { titulo: 'DLP, MFA, Intune', conteudo: 'Aplicar DLP para e-mail e arquivos, MFA obrigatório e Intune para dispositivos corporativos e BYOD.' }
];

async function carregar() {
  exigirLogin();
  await renderLayout('Orientações');
  renderMenu('orientacoes.html');

  document.getElementById('orientacoes-lista').innerHTML = orientacoes
    .map(
      (item) => `
        <div class="nitro-card p-4">
          <h3 class="font-semibold text-lg">${item.titulo}</h3>
          <p class="text-sm text-gray-600 mt-1">${item.conteudo}</p>
        </div>`
    )
    .join('');
}

document.addEventListener('DOMContentLoaded', carregar);
