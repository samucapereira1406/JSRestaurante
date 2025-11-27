let restauranteId = localStorage.getItem("restauranteId");

if (!restauranteId) {
  alert("Acesso negado. Faça login no restaurante.");
  window.location.href = "index.html";
}

let editandoGarcomId = null;

async function cadastrarGarcom() {
  const nome = document.getElementById("nomeGarcom").value;
  const email = document.getElementById("emailGarcom").value;
  const senha = document.getElementById("senhaGarcom").value;

  const metodo = editandoGarcomId ? "PUT" : "POST";
  const url = editandoGarcomId ? `http://localhost:3000/api/garcons/${editandoGarcomId}` : "http://localhost:3000/api/garcons";

  if (!nome.trim() || !email.trim() || !senha.trim()) {
  alert("Preencha todos os campos antes de continuar.");
  return;
}

  const res = await fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha, idRestaurante: restauranteId })
  });

  if (res.ok) {
    alert(editandoGarcomId ? "Garçom atualizado com sucesso!" : "Garçom cadastrado com sucesso!");
    document.getElementById("nomeGarcom").value = "";
    document.getElementById("emailGarcom").value = "";
    document.getElementById("senhaGarcom").value = "";
    editandoGarcomId = null;
    document.querySelector("button[onclick='cadastrarGarcom()']").textContent = "Cadastrar Garçom";
    listarGarcons();
  } else {
    alert("Erro ao salvar garçom.");
  }
}

function editarGarcom(id, nome, email, senha) {
  document.getElementById("nomeGarcom").value = nome;
  document.getElementById("emailGarcom").value = email;
  document.getElementById("senhaGarcom").value = senha;
  editandoGarcomId = id;
  document.querySelector("button[onclick='cadastrarGarcom()']").textContent = "Salvar Edição";
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function listarGarcons() {
  const res = await fetch("http://localhost:3000/api/garcons");
  const garcons = await res.json();

  const tabela = document.getElementById("tabelaGarcons");
  tabela.innerHTML = "";

  garcons.filter(g => g.idRestaurante == restauranteId).forEach(g => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${g.nome}</td>
      <td>${g.email}</td>
      <td>
        <button onclick="editarGarcom(${g.id}, '${g.nome}', '${g.email}', '${g.senha}')">Editar</button>
        <button onclick="atribuirMesas(${g.id})">Atribuir Mesas</button>
        <button onclick="excluirGarcom(${g.id})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

async function excluirGarcom(id) {
  if (!confirm("Tem certeza que deseja excluir este garçom?")) return;

  const res = await fetch(`http://localhost:3000/api/garcons/${id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    listarGarcons();
  } else {
    alert("Erro ao excluir garçom.");
  }
}

function atribuirMesas(id) {
  window.location.href = `atribuir-mesas.html?id=${id}`;
}

window.onload = listarGarcons;
