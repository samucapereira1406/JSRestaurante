let restauranteId = localStorage.getItem("restauranteId");

if (!restauranteId) {
  alert("Acesso negado. Faça login no restaurante.");
  window.location.href = "index.html";
}

async function carregarReservas() {
  const res = await fetch("http://localhost:3000/api/reservas");
  const reservas = await res.json();

  const tabela = document.getElementById("tabelaReservas");
  tabela.innerHTML = "";

  const reservasDoRestaurante = reservas.filter(r => r.idMesa && r.nomeRestaurante && r.idCliente);

  if (reservasDoRestaurante.length === 0) {
    tabela.innerHTML = '<tr><td colspan="4">Nenhuma reserva encontrada.</td></tr>';
    return;
  }

  reservasDoRestaurante.forEach(r => {
    const tr = document.createElement("tr");
    const data = new Date(r.dataHora || r.data_hora).toLocaleString("pt-BR");

    tr.innerHTML = `
      <td>${r.nomeRestaurante}</td>
      <td>${r.numeroMesa}</td>
      <td>${data}</td>
      <td>${r.nomeCliente} (ID ${r.idCliente})</td>
    `;

    tabela.appendChild(tr);
  });
}

window.onload = carregarReservas;
