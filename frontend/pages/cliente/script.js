let clienteId = null;

function mostrarCadastro() {
  ocultarTodos();
  document.getElementById("formCadastro").style.display = "block";
}

function mostrarLogin() {
  ocultarTodos();
  document.getElementById("formLogin").style.display = "block";
}

function mostrarReserva() {
  ocultarTodos();
  document.getElementById("reserva").style.display = "block";
  carregarRestaurantes();
  carregarMinhasReservas();
}

function voltarInicio() {
  ocultarTodos();
  document.getElementById("inicio").style.display = "block";
}

function ocultarTodos() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("formCadastro").style.display = "none";
  document.getElementById("formLogin").style.display = "none";
  document.getElementById("reserva").style.display = "none";
}

function logout() {
  clienteId = null;
  localStorage.removeItem("clienteId");
  alert("Logout realizado.");
  voltarInicio();
}

async function cadastrarCliente() {
  const nome = document.getElementById("cadNome").value;
  const telefone = document.getElementById("cadTelefone").value;
  const email = document.getElementById("cadEmail").value;
  const senha = document.getElementById("cadSenha").value;

  const res = await fetch("http://localhost:3000/api/clientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, telefone, email, senha })
  });

  if (res.ok) {
    alert("Cadastro realizado!");
    voltarInicio();
  } else {
    alert("Erro ao cadastrar.");
  }
}

async function loginCliente() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const senha = document.getElementById("loginSenha").value.trim();

  const res = await fetch("http://localhost:3000/api/clientes");
  const clientes = await res.json();

  const cliente = clientes.find(c =>
    c.email && c.senha &&
    c.email.trim().toLowerCase() === email &&
    c.senha.trim() === senha
  );

  if (cliente) {
    clienteId = cliente.id || cliente.id_cliente;
    localStorage.setItem("clienteId", clienteId);
    alert("Login bem-sucedido!");
    mostrarReserva();
  } else {
    alert("Email ou senha inválidos.");
  }
}

async function carregarRestaurantes() {
  const res = await fetch("http://localhost:3000/api/restaurantes");
  const restaurantes = await res.json();
  const select = document.getElementById("restaurantes");

  select.innerHTML = '<option disabled selected>Escolha um restaurante</option>';
  restaurantes.forEach(r => {
    const option = document.createElement("option");
    option.value = r.id_restaurante || r.id;
    option.text = r.nome;
    select.appendChild(option);
  });
}

async function carregarMesas() {
  const restauranteId = parseInt(document.getElementById("restaurantes").value);
  const res = await fetch("http://localhost:3000/api/mesas");
  const mesas = await res.json();
  const select = document.getElementById("mesas");

  select.innerHTML = '<option disabled selected>Escolha uma mesa</option>';
  mesas
    .filter(m => m.idRestaurante === restauranteId && m.status === "disponivel")
    .forEach(m => {
      const option = document.createElement("option");
      option.value = m.id || m.id_mesa;
      option.text = `Mesa ${m.numero || m.id || m.id_mesa} - ${m.capacidade} pessoas`;
      select.appendChild(option);
    });
}

async function fazerReserva() {
  const idMesa = parseInt(document.getElementById("mesas").value);
  const dataHora = document.getElementById("dataHora").value;

  if (!clienteId) {
    alert("Faça login primeiro.");
    return;
  }

  const res = await fetch("http://localhost:3000/api/reservas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idCliente: clienteId, idMesa, dataHora })
  });

  if (res.ok) {
    alert("Reserva feita com sucesso!");
    carregarMinhasReservas();
  } else {
    const erro = await res.text();
    alert("Erro ao fazer reserva: " + erro);
  }
}

async function carregarMinhasReservas() {
  const res = await fetch("http://localhost:3000/api/reservas");
  const reservas = await res.json();

  console.log("Reservas recebidas:", reservas);
  console.log("Cliente ID:", clienteId);

  const minhas = reservas.filter(r =>
    r.idCliente == clienteId // comparação mais segura
  );

  console.log("Minhas reservas filtradas:", minhas);

  const lista = document.getElementById("listaReservas");
  lista.innerHTML = "";

  if (minhas.length === 0) {
    lista.innerHTML = "<li>Nenhuma reserva encontrada.</li>";
    return;
  }

  for (const r of minhas) {
    const li = document.createElement("li");
    const dataFormatada = new Date(r.dataHora || r.data_hora).toLocaleString("pt-BR");
    li.textContent = `${r.nomeRestaurante} - Mesa ${r.numeroMesa} - ${dataFormatada}`;
    lista.appendChild(li);
  }
}


// Verificação automática de login
window.onload = () => {
  clienteId = parseInt(localStorage.getItem("clienteId"));
  if (id) {
    clienteId = parseInt(id);
    mostrarReserva();
  } else {
    voltarInicio();
  }
};
