import { exigirLogin } from './auth.js';
import { renderLayout, renderMenu } from './ui.js';
import { apiGet } from './api.js';

async function carregar() {
  exigirLogin();
  await renderLayout('Relatórios');
  renderMenu('relatorios.html');

  const relatorios = await apiGet('/relatorios');
  document.getElementById('relatorio-licencas').innerHTML = relatorios.licencas
    .map((lic) => `<li class="flex items-center justify-between"><span>${lic.tipo}</span><span class="font-semibold">${lic.quantidade}</span></li>`)
    .join('');

  document.getElementById('relatorio-servicos').innerHTML = relatorios.statusServicos
    .map((servico) => `<li class="flex items-center justify-between"><span>${servico.nome}</span><span class="nitro-badge bg-sky-100 text-sky-700">${servico.criticidade}</span></li>`)
    .join('');

  document.getElementById('relatorio-cronograma').innerHTML = relatorios.cronograma
    .map((etapa) => `<li class="flex items-center justify-between"><span>${etapa.nome}</span><span>${etapa.status}</span></li>`)
    .join('');

  document.getElementById('relatorio-recomendacoes').innerHTML = relatorios.recomendacoes
    .map((rec) => `<li>• ${rec}</li>`) 
    .join('');

  document.getElementById('relatorio-logs').innerHTML = relatorios.logs
    .map((log) => `<li class="flex items-center justify-between"><span>${log.data}</span><span>${log.evento}</span></li>`)
    .join('');

  document.getElementById('resumo-executivo').textContent = relatorios.resumoExecutivo;
}

document.addEventListener('DOMContentLoaded', carregar);
