import { exigirLogin, obterSessao } from './auth.js';
import { renderLayout, renderMenu } from './ui.js';
import { apiGet } from './api.js';

async function carregar() {
  const sessao = exigirLogin();
  await renderLayout('Teams');
  renderMenu('teams.html');

  const teams = await apiGet('/teams');
  document.getElementById('boas-praticas').innerHTML = `
    <div class="nitro-card p-4">
      <h3 class="font-semibold text-lg mb-2">Boas práticas Nitro</h3>
      <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li>${teams.boasPraticas.nomenclatura}</li>
        <li>${teams.boasPraticas.limites}</li>
        <li>${teams.boasPraticas.governanca}</li>
        <li>${teams.boasPraticas.backups}</li>
        <li>${teams.boasPraticas.seguranca}</li>
      </ul>
    </div>`;

  document.getElementById('equipes').innerHTML = teams.equipes
    .map(
      (equipe) => `
      <div class="nitro-card p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">${equipe.tipo}</p>
            <h3 class="text-lg font-semibold">${equipe.nome}</h3>
            <p class="text-sm text-gray-600">${equipe.proposito}</p>
          </div>
          <span class="nitro-badge bg-purple-100 text-purple-700">${equipe.canais.length} canais</span>
        </div>
        <div class="grid md:grid-cols-3 gap-2 text-sm text-gray-600 mt-3">
          <p>Proprietários: ${equipe.proprietarios.join(', ')}</p>
          <p>Membros: ${equipe.membros.join(', ')}</p>
          <p>Recursos: ${equipe.recursos.join(', ')}</p>
        </div>
        <p class="mt-2 text-sm text-gray-600">Observações: ${equipe.observacoes || '—'}</p>
      </div>`
    )
    .join('');

  if (sessao.papel === 'cliente') {
    document.getElementById('form-teams').classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', carregar);
