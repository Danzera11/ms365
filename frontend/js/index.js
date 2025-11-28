import { guardarSessao } from './auth.js';

const API_BASE = 'http://10.10.5.108:3000/api';

async function login(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const senha = form.senha.value;
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  if (!response.ok) {
    alert('Credenciais inválidas');
    return;
  }
  const data = await response.json();
  guardarSessao(data.usuario);
  localStorage.setItem('token', data.token);
  window.location.href = '/public/dashboard.html';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-form').addEventListener('submit', login);
});
