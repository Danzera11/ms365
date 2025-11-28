import { obterSessao, logout, rotuloPapel } from './auth.js';
import { apiGet } from './api.js';

export async function renderLayout(title) {
  const sessao = obterSessao();
  const projeto = await apiGet('/projeto');
  const header = document.getElementById('nitro-header');
  if (!header) return;

  header.innerHTML = `
    <div class="header-gradient text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-bold text-lg">N</div>
          <div>
            <p class="text-sm uppercase tracking-wide">Plataforma de Implantação Microsoft 365</p>
            <h1 class="text-2xl font-bold">Portal Nitro — ${title}</h1>
            <p class="text-sm text-blue-100">Gestão completa de seu projeto de migração</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div>
            <p class="text-sm text-blue-100">${projeto.empresa}</p>
            <div class="w-64 bg-white/20 rounded-full h-3 overflow-hidden">
              <div class="bg-sky-300 h-3" style="width:${projeto.percentualConcluido}%"></div>
            </div>
            <p class="text-xs text-blue-100 mt-1">${projeto.percentualConcluido}% concluído</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-semibold">${sessao?.nome || 'Visitante'}</p>
            <p class="text-xs text-blue-100">${rotuloPapel(sessao?.papel || 'cliente')}</p>
            <button id="logoutBtn" class="mt-2 px-3 py-1 text-xs bg-white text-sky-700 rounded-full">Sair</button>
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById('logoutBtn')?.addEventListener('click', logout);
}

export function renderMenu(active) {
  const menu = document.getElementById('nitro-menu');
  if (!menu) return;
  const items = [
    { href: 'dashboard.html', label: 'Dashboard' },
    { href: 'levantamento.html', label: 'Levantamento' },
    { href: 'usuarios.html', label: 'Usuários' },
    { href: 'email.html', label: 'E-mail' },
    { href: 'sharepoint.html', label: 'SharePoint' },
    { href: 'teams.html', label: 'Teams' },
    { href: 'cronograma.html', label: 'Cronograma' },
    { href: 'relatorios.html', label: 'Relatórios' },
    { href: 'orientacoes.html', label: 'Orientações' }
  ];

  menu.innerHTML = `
    <nav class="bg-white shadow sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-2 items-center justify-between">
        <div class="flex flex-wrap gap-2">
          ${items
            .map(
              (item) => `
                <a href="${item.href}" class="px-3 py-2 text-sm rounded-lg ${
                  active === item.href ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-gray-700'
                }">${item.label}</a>`
            )
            .join('')}
        </div>
        <div class="text-xs text-gray-500">Área protegida — acione o analista para alterações.</div>
      </div>
    </nav>`;
}
