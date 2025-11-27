import { exigirLogin } from './auth.js';
import { renderLayout, renderMenu } from './ui.js';
import { apiGet } from './api.js';

async function carregarDashboard() {
  exigirLogin();
  await renderLayout('Dashboard');
  renderMenu('dashboard.html');

  const projeto = await apiGet('/projeto');
  const usuarios = await apiGet('/usuarios');
  const levantamento = await apiGet('/levantamento');
  const teams = await apiGet('/teams');
  const sharepoint = await apiGet('/sharepoint');

  document.getElementById('projeto-info').innerHTML = `
    <div class="grid md:grid-cols-4 gap-4">
      <div class="nitro-card p-4">
        <p class="text-sm text-gray-500">Usuários cadastrados</p>
        <h3 class="text-2xl font-bold">${usuarios.length}</h3>
      </div>
      <div class="nitro-card p-4">
        <p class="text-sm text-gray-500">E-mails para migrar</p>
        <h3 class="text-2xl font-bold">${usuarios.filter((u) => u.migrarEmail).length}</h3>
      </div>
      <div class="nitro-card p-4">
        <p class="text-sm text-gray-500">Sites SharePoint</p>
        <h3 class="text-2xl font-bold">${sharepoint.length}</h3>
      </div>
      <div class="nitro-card p-4">
        <p class="text-sm text-gray-500">Equipes Teams</p>
        <h3 class="text-2xl font-bold">${teams.equipes.length}</h3>
      </div>
    </div>`;

  const entregas = projeto.entregas
    .map(
      (entrega) => `
      <div class="flex items-center justify-between py-2">
        <div>
          <p class="font-semibold">${entrega.nome}</p>
          <p class="text-xs text-gray-500">Status</p>
        </div>
        <div class="w-40 bg-gray-100 h-3 rounded-full overflow-hidden">
          <div class="h-3 bg-sky-500" style="width:${entrega.status}%"></div>
        </div>
        <span class="text-sm font-semibold">${entrega.status}%</span>
      </div>`
    )
    .join('');
  document.getElementById('entregas').innerHTML = entregas;

  const modulos = projeto.modulos
    .map(
      (m) => `
      <div class="flex items-center justify-between py-2">
        <div>
          <p class="font-semibold">${m.nome}</p>
          <p class="text-xs text-gray-500">Progresso do módulo</p>
        </div>
        <div class="w-48 bg-gray-100 h-3 rounded-full overflow-hidden">
          <div class="h-3 bg-emerald-500" style="width:${m.progresso}%"></div>
        </div>
        <span class="text-sm font-semibold">${m.progresso}%</span>
      </div>`
    )
    .join('');
  document.getElementById('modulos').innerHTML = modulos;

  const licencas = projeto.licenciamento
    .map((lic) => `<li class="flex items-center justify-between py-1"><span>${lic.tipo}</span><span class="font-semibold">${lic.quantidade}</span></li>`)
    .join('');
  document.getElementById('licenciamento').innerHTML = licencas;

  const tabelaLevantamento = levantamento
    .map(
      (item) => `
        <tr class="border-b">
          <td class="px-4 py-2 font-semibold">${item.nome}</td>
          <td class="px-4 py-2">${item.categoria}</td>
          <td class="px-4 py-2"><span class="nitro-badge bg-sky-100 text-sky-700">${item.criticidade}</span></td>
          <td class="px-4 py-2">${item.tempoEstimadoSemanas} semanas</td>
          <td class="px-4 py-2">${item.selecionado ? '✔' : '—'}</td>
        </tr>`
    )
    .join('');
  document.getElementById('levantamento-tabela').innerHTML = tabelaLevantamento;
}

document.addEventListener('DOMContentLoaded', carregarDashboard);
