<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Nitro - Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/public/css/styles.css">
</head>
<body>
  <div id="nitro-header"></div>
  <div id="nitro-menu"></div>
  <main class="max-w-7xl mx-auto px-6 py-6 space-y-6">
    <section class="nitro-card p-6">
      <h2 class="text-xl font-bold section-title">Resumo do projeto</h2>
      <div id="projeto-info" class="mt-4"></div>
    </section>
    <section class="grid md:grid-cols-2 gap-6">
      <div class="nitro-card p-6">
        <h3 class="font-semibold text-lg">Entregas principais</h3>
        <div id="entregas" class="mt-4 space-y-2"></div>
      </div>
      <div class="nitro-card p-6">
        <h3 class="font-semibold text-lg">Progresso por módulo</h3>
        <div id="modulos" class="mt-4 space-y-2"></div>
      </div>
    </section>
    <section class="grid md:grid-cols-2 gap-6">
      <div class="nitro-card p-6">
        <h3 class="font-semibold text-lg">Licenciamento</h3>
        <ul id="licenciamento" class="mt-3 space-y-1"></ul>
      </div>
      <div class="nitro-card p-6">
        <h3 class="font-semibold text-lg">Status dos serviços</h3>
        <table class="min-w-full table-nitro">
          <thead><tr><th class="px-4 py-2 text-left">Serviço</th><th class="px-4 py-2 text-left">Categoria</th><th class="px-4 py-2 text-left">Criticidade</th><th class="px-4 py-2 text-left">Tempo</th><th class="px-4 py-2 text-left">Seleção</th></tr></thead>
          <tbody id="levantamento-tabela"></tbody>
        </table>
      </div>
    </section>
  </main>
  <script type="module" src="/public/js/dashboard.js"></script>
</body>
</html>
~
~

