export function guardarSessao(usuario) {
  localStorage.setItem('nitroUsuario', JSON.stringify(usuario));
}

export function obterSessao() {
  const raw = localStorage.getItem('nitroUsuario');
  return raw ? JSON.parse(raw) : null;
}

export function exigirLogin() {
  const sessao = obterSessao();
  if (!sessao) {
    window.location.href = '/public/index.html';
  }
  return sessao;
}

export function logout() {
  localStorage.removeItem('nitroUsuario');
  localStorage.removeItem('token');
  window.location.href = '/public/index.html';
}

export function rotuloPapel(papel) {
  return papel === 'analista' ? 'Analista (edição completa)' : 'Cliente (visualização)';
}
