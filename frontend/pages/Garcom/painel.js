const garcomId       = localStorage.getItem('garcomId');
const garcomNome     = localStorage.getItem('garcomNome');
const restauranteId  = localStorage.getItem('restauranteId');

if (!garcomId || garcomId === 'undefined') {
  alert('Faça login como garçom.');
  window.location.href = '../garcomLogin.html';
}

async function carregarMesas() {
  try {
    const resp  = await fetch(`http://localhost:3000/api/garcons/${garcomId}/mesas`);
    if (!resp.ok) throw new Error(await resp.text());
    const mesas = await resp.json();          // [{id_mesa, numero}, …]

    const select = document.getElementById('mesas');
    select.innerHTML = '<option value="" disabled selected>Escolha uma mesa</option>';

    mesas.forEach(m => {
      const idMesa = m.id_mesa ?? m.id ?? m.idMesa;
      const numero = m.numero ?? idMesa;
      const opt    = document.createElement('option');
      opt.value    = idMesa;
      opt.textContent = `Mesa ${numero}`;
      select.appendChild(opt);
    });
  } catch (err) {
    console.error('Falha ao carregar mesas:', err);
    alert('Erro ao carregar suas mesas. Tente novamente.');
  }
}

function acessarMesa() {
  const id = document.getElementById('mesas').value;
  if (!id) return alert('Selecione uma mesa.');
  localStorage.setItem('mesaSelecionada', id);
  window.location.href = 'mesaPedidos.html';
}

function logout() {
  localStorage.removeItem("garcomId");
  localStorage.removeItem("mesaSelecionada");
  window.location.href = "/frontend/pages/Garcom/garcomLogin.html"; // ✅ CERTO
}


window.onload = carregarMesas;
