import { exigirLogin, obterSessao } from './auth.js';
import { renderLayout, renderMenu } from './ui.js';
import { apiGet, apiPost } from './api.js';

async function carregar() {
  const sessao = exigirLogin();
  await renderLayout('Usuários');
  renderMenu('usuarios.html');

  const tabela = document.getElementById('usuarios-tabela');
  const data = await apiGet('/usuarios');
  tabela.innerHTML = data
    .map(
      (u) => `
      <tr class="border-b">
        <td class="px-4 py-2 font-semibold">${u.nome}</td>
        <td class="px-4 py-2">${u.departamento}</td>
        <td class="px-4 py-2">${u.cargo}</td>
        <td class="px-4 py-2">${u.email}</td>
        <td class="px-4 py-2">${u.tamanhoCaixaGb} GB</td>
        <td class="px-4 py-2">${u.migrarEmail ? '✔' : '—'}</td>
        <td class="px-4 py-2">${u.oneDrive ? '✔' : '—'}</td>
        <td class="px-4 py-2">${u.sharePoint ? '✔' : '—'}</td>
        <td class="px-4 py-2">${u.teams ? '✔' : '—'}</td>
      </tr>`
    )
    .join('');

  if (sessao.papel === 'analista') {
    const form = document.getElementById('form-usuario');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const payload = {
        nome: formData.get('nome'),
        departamento: formData.get('departamento'),
        cargo: formData.get('cargo'),
        email: formData.get('email'),
        tamanhoCaixaGb: Number(formData.get('tamanhoCaixaGb')),
        officeLocal: formData.get('officeLocal') === 'on',
        migrarEmail: formData.get('migrarEmail') === 'on',
        oneDrive: formData.get('oneDrive') === 'on',
        sharePoint: formData.get('sharePoint') === 'on',
        teams: formData.get('teams') === 'on'
      };
      const novo = await apiPost('/usuarios', payload);
      tabela.insertAdjacentHTML(
        'beforeend',
        `<tr class="border-b">
          <td class="px-4 py-2 font-semibold">${novo.nome}</td>
          <td class="px-4 py-2">${novo.departamento}</td>
          <td class="px-4 py-2">${novo.cargo}</td>
          <td class="px-4 py-2">${novo.email}</td>
          <td class="px-4 py-2">${novo.tamanhoCaixaGb} GB</td>
          <td class="px-4 py-2">${novo.migrarEmail ? '✔' : '—'}</td>
          <td class="px-4 py-2">${novo.oneDrive ? '✔' : '—'}</td>
          <td class="px-4 py-2">${novo.sharePoint ? '✔' : '—'}</td>
          <td class="px-4 py-2">${novo.teams ? '✔' : '—'}</td>
        </tr>`
      );
      form.reset();
    });
  } else {
    document.getElementById('form-usuario').classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', carregar);
