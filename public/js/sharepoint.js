import { exigirLogin, obterSessao } from './auth.js';
import { renderLayout, renderMenu } from './ui.js';
import { apiGet } from './api.js';

async function carregar() {
  const sessao = exigirLogin();
  await renderLayout('SharePoint');
  renderMenu('sharepoint.html');

  const sites = await apiGet('/sharepoint');
  const container = document.getElementById('lista-sites');
  container.innerHTML = sites
    .map(
      (s) => `
        <div class="nitro-card p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">${s.tipo}</p>
              <h3 class="text-lg font-semibold">${s.nome}</h3>
              <p class="text-sm text-gray-600">${s.proposito}</p>
            </div>
            <span class="nitro-badge bg-indigo-100 text-indigo-700">${s.nivel}</span>
          </div>
          <div class="grid md:grid-cols-3 gap-2 text-sm text-gray-600 mt-3">
            <p>Proprietários: ${s.proprietarios.join(', ')}</p>
            <p>Membros: ${s.membros.join(', ')}</p>
            <p>Volume: ${s.volumeDadosGb} GB</p>
          </div>
          <p class="mt-2 text-sm text-gray-600">Origem: ${s.pastaOrigem}</p>
          <p class="mt-2 text-sm text-emerald-700">Recomendações: ${s.recomendacoes}</p>
        </div>`
    )
    .join('');

  if (sessao.papel === 'cliente') {
    document.getElementById('form-sharepoint').classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', carregar);
