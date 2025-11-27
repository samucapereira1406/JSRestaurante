let restauranteId = localStorage.getItem("restauranteId");

if (!restauranteId) {
  alert("Acesso negado. Faça login no restaurante.");
  window.location.href = "index.html";
}

async function cadastrarMesa() {
  const numero = parseInt(document.getElementById("numeroMesa").value);
  const capacidade = parseInt(document.getElementById("capacidadeMesa").value);
  const status = "disponivel";

  const res = await fetch("http://localhost:3000/api/mesas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ numero, capacidade, status, idRestaurante: restauranteId })
  });

  if (res.ok) {
    alert("Mesa cadastrada com sucesso!");
    document.getElementById("numeroMesa").value = "";
    document.getElementById("capacidadeMesa").value = "";
    listarMesas();
  } else {
    alert("Erro ao cadastrar mesa.");
  }
}

async function listarMesas() {
  const res = await fetch("http://localhost:3000/api/mesas");
  const mesas = await res.json();

  const tabela = document.getElementById("tabelaMesas");
  tabela.innerHTML = "";

  mesas.filter(m => m.idRestaurante == restauranteId).forEach(m => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><input type="number" value="${m.numero}" id="num-${m.id}" /></td>
        <td><input type="number" value="${m.capacidade}" id="cap-${m.id}" /></td>
        <td>${m.status}</td>
        <td>
          <button onclick="salvarEdicao(${m.id})">Salvar</button>
          <button onclick="excluirMesa(${m.id})">Excluir</button>
        </td>
    `;

    tabela.appendChild(tr);
  });
}

async function salvarEdicao(id) {
  const numero = parseInt(document.getElementById(`num-${id}`).value);
  const capacidade = parseInt(document.getElementById(`cap-${id}`).value);
  const status = document.getElementById(`status-${id}`).value;

  const res = await fetch(`http://localhost:3000/api/mesas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ numero, capacidade, status })
  });

  if (res.ok) {
    alert("Mesa atualizada!");
    listarMesas();
  } else {
    alert("Erro ao salvar alterações.");
  }
}

async function excluirMesa(id) {
  if (confirm("Tem certeza que deseja excluir esta mesa?")) {
    const res = await fetch(`http://localhost:3000/api/mesas/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      listarMesas();
    } else {
      alert("Erro ao excluir mesa.");
    }
  }
}

window.onload = listarMesas;
