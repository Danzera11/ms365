import { guardarSessao } from './auth.js';

async function login(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const senha = form.senha.value;
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  if (!response.ok) {
    alert('Credenciais inválidas');
    return;
  }
  const data = await response.json();
  guardarSessao(data);
  window.location.href = '/public/dashboard.html';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-form').addEventListener('submit', login);
});
