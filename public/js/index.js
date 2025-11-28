import { guardarSessao } from "./auth.js";

const API_BASE = "http://10.10.5.108:3000/api";

async function login(event) {
  event.preventDefault();

  const email = event.target.email.value.trim();
  const senha = event.target.senha.value.trim();

  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || "Credenciais inválidas");
    return;
  }

  guardarSessao(data.usuario);
  localStorage.setItem("token", data.token);

  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-form").addEventListener("submit", login);
});

