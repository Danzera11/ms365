// Caminho base seguro para o login
const LOGIN_PAGE = "/index.html";
const ANALISTA_HOME = "/dashboard.html";
const CLIENTE_HOME = "/dashboard.html"; // caso queira separar, troque aqui

// Salvar sessão do usuário
export function guardarSessao({ id, papel, nome, email }) {
  localStorage.setItem(
    "nitroUsuario",
    JSON.stringify({ id, papel, nome, email })
  );
}

// Ler sessão salva
export function obterSessao() {
  const raw = localStorage.getItem("nitroUsuario");
  return raw ? JSON.parse(raw) : null;
}

// Exigir que esteja logado antes de acessar páginas internas
export function exigirLogin() {
  const sessao = obterSessao();
  if (!sessao) {
    window.location.href = LOGIN_PAGE;
    return null;
  }
  return sessao;
}

// Logout
export function logout() {
  localStorage.removeItem("nitroUsuario");
  window.location.href = LOGIN_PAGE;
}

// Nome mais amigável do papel
export function rotuloPapel(papel) {
  switch (papel) {
    case "analista":
      return "Analista (Edição Completa)";
    case "cliente":
      return "Cliente (Visualização)";
    default:
      return "Usuário";
  }
}

// Redireciona automaticamente após login
export function redirecionarPorPapel(papel) {
  if (papel === "analista") {
    window.location.href = ANALISTA_HOME;
  } else {
    window.location.href = CLIENTE_HOME;
  }
}

