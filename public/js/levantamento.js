import { exigirLogin, obterSessao } from './auth.js';
import { renderLayout, renderMenu } from './ui.js';
import { apiGet, apiPut } from './api.js';

async function carregar() {
  const sessao = exigirLogin();
  await renderLayout('Levantamento');
  renderMenu('levantamento.html');

  const lista = await apiGet('/levantamento');
  const container = document.getElementById('lista-servicos');
  container.innerHTML = lista
    .map((item) => `
      <div class="nitro-card p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <p class="text-sm text-gray-500">${item.categoria}</p>
          <h3 class="text-lg font-semibold">${item.nome}</h3>
          <p class="text-sm text-gray-600">${item.observacoes || ''}</p>
        </div>
        <div class="flex items-center gap-4">
          <span class="nitro-badge bg-sky-100 text-sky-700">${item.criticidade}</span>
          <span class="text-sm">${item.tempoEstimadoSemanas} semanas</span>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" data-id="${item.id}" ${item.selecionado ? 'checked' : ''} ${
      sessao.papel === 'cliente' ? 'disabled' : ''
    } /> Selecionado
          </label>
        </div>
      </div>`)
    .join('');

  if (sessao.papel === 'analista') {
    container.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener('change', async (event) => {
        const id = event.target.dataset.id;
        await apiPut(`/levantamento/${id}`, { selecionado: event.target.checked });
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', carregar);
