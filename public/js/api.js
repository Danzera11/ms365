const API_BASE = 'http://10.10.5.108:3000/api';

function buildHeaders(extra = {}) {
  const token = localStorage.getItem('token');
  const headers = { ...extra };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`, { headers: buildHeaders() });
  if (!response.ok) throw new Error('Erro ao buscar dados');
  return response.json();
}

export async function apiPost(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: buildHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error('Erro ao salvar');
  return response.json();
}

export async function apiPut(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: buildHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error('Erro ao atualizar');
  return response.json();
}
