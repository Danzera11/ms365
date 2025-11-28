import { exigirLogin, obterSessao } from './auth.js';
import { renderLayout, renderMenu } from './ui.js';
import { apiGet } from './api.js';

async function carregar() {
  const sessao = exigirLogin();
  await renderLayout('Cronograma');
  renderMenu('cronograma.html');

  const etapas = await apiGet('/cronograma');
  const tabela = document.getElementById('cronograma-tabela');
  tabela.innerHTML = etapas
    .map(
      (etapa) => `
        <tr class="border-b">
          <td class="px-4 py-2 font-semibold">${etapa.nome}</td>
          <td class="px-4 py-2">${etapa.responsavel}</td>
          <td class="px-4 py-2">${etapa.inicio}</td>
          <td class="px-4 py-2">${etapa.fim}</td>
          <td class="px-4 py-2">${etapa.duracaoDias} dias</td>
          <td class="px-4 py-2">${etapa.status}</td>
        </tr>`
    )
    .join('');

  if (sessao.papel === 'cliente') {
    document.getElementById('form-cronograma').classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', carregar);
