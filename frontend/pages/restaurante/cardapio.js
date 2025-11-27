let restauranteId = localStorage.getItem("restauranteId");

if (!restauranteId) {
  alert("Acesso negado. Faça login no restaurante.");
  window.location.href = "index.html";
}

async function cadastrarItem() {
  const nome = document.getElementById("nomeItem").value.trim();
  const preco = parseFloat(document.getElementById("precoItem").value);

  const res = await fetch("http://localhost:3000/api/cardapio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, preco, idRestaurante: restauranteId })
  });

  if (res.ok) {
    alert("Item adicionado com sucesso!");
    document.getElementById("nomeItem").value = "";
    document.getElementById("precoItem").value = "";
    listarCardapio();
  } else {
    alert("Erro ao adicionar item.");
  }
}

async function listarCardapio() {
  const res = await fetch("http://localhost:3000/api/cardapio");
  const itens = await res.json();

  const tabela = document.getElementById("tabelaCardapio");
  tabela.innerHTML = "";

  itens.filter(i => i.idRestaurante == restauranteId).forEach(i => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><input type="text" value="${i.nome}" id="nome-${i.id}" /></td>
      <td><input type="number" value="${i.preco}" step="0.01" id="preco-${i.id}" /></td>
      <td>
        <button onclick="salvarItem(${i.id})">Salvar</button>
        <button onclick="excluirItem(${i.id})">Excluir</button>
      </td>
    `;

    tabela.appendChild(tr);
  });
}

async function salvarItem(id) {
  const nome = document.getElementById(`nome-${id}`).value;
  const preco = parseFloat(document.getElementById(`preco-${id}`).value);

  const res = await fetch(`http://localhost:3000/api/cardapio/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, preco })
  });

  if (res.ok) {
    alert("Item atualizado!");
    listarCardapio();
  } else {
    alert("Erro ao atualizar item.");
  }
}

async function excluirItem(id) {
  if (confirm("Tem certeza que deseja excluir este item?")) {
    const res = await fetch(`http://localhost:3000/api/cardapio/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      listarCardapio();
    } else {
      alert("Erro ao excluir item.");
    }
  }
}

window.onload = listarCardapio;
