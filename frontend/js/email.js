import { exigirLogin, obterSessao } from './auth.js';
import { renderLayout, renderMenu } from './ui.js';
import { apiGet } from './api.js';

async function carregar() {
  const sessao = exigirLogin();
  await renderLayout('E-mail');
  renderMenu('email.html');

  const email = await apiGet('/email');
  const painel = document.getElementById('email-detalhes');
  painel.innerHTML = `
    <div class="grid md:grid-cols-2 gap-4">
      <div class="nitro-card p-4">
        <p class="text-sm text-gray-500">Plataforma de origem</p>
        <h3 class="text-lg font-semibold">${email.plataformaOrigem}</h3>
        <p class="mt-2 text-sm text-gray-600">Metodologia: ${email.metodologia}</p>
        <p class="text-sm text-gray-600">Janela preferida: ${email.janelaPreferida}</p>
      </div>
      <div class="nitro-card p-4">
        <p class="text-sm text-gray-500">Volume total estimado</p>
        <h3 class="text-3xl font-bold text-sky-700">${email.volumeTotalGb} GB</h3>
        <p class="text-sm text-gray-600">Caixas compartilhadas: ${email.caixasCompartilhadas}</p>
        <p class="text-sm text-gray-600">Grupos de distribuição: ${email.gruposDistribuicao}</p>
      </div>
      <div class="nitro-card p-4 md:col-span-2">
        <h4 class="font-semibold mb-2">Componentes</h4>
        <div class="flex flex-wrap gap-2">
          ${email.componentes.map((c) => `<span class="nitro-badge bg-emerald-100 text-emerald-700">${c}</span>`).join('')}
        </div>
        <p class="mt-3 text-sm text-gray-600">Observações: ${email.observacoes}</p>
      </div>
    </div>`;

  if (sessao.papel === 'cliente') {
    document.getElementById('form-email').classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', carregar);
