let restauranteId = null;

// ===== Ações de Navegação =====
function mostrarCadastro() {
  ocultarTodos();
  document.getElementById("formCadastro").style.display = "block";
}

function mostrarLogin() {
  ocultarTodos();
  document.getElementById("formLogin").style.display = "block";
}

function mostrarPainel() {
  ocultarTodos();
  document.getElementById("painel").style.display = "block";

  // Ativa botões do painel
  const rotas = {
    btnMesas: "mesas.html",
    btnCardapio: "cardapio.html",
    btnGarcons: "garcons.html",
    btnReservas: "reserva.html",
    btnPedidos: "pedidos.html"
  };

  for (const [id, rota] of Object.entries(rotas)) {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = () => (window.location.href = rota);
  }
}

function voltarInicio() {
  ocultarTodos();
  document.getElementById("inicio").style.display = "block";
}

function ocultarTodos() {
  ["inicio", "formCadastro", "formLogin", "painel"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

// ===== Lógica de Sessão =====
function logout() {
  restauranteId = null;
  localStorage.removeItem("restauranteId");
  alert("Logout realizado com sucesso.");
  voltarInicio();
}

// ===== Cadastro/Login =====
async function cadastrarRestaurante() {
  const nome = document.getElementById("cadNome").value;
  const email = document.getElementById("cadEmail").value;
  const senha = document.getElementById("cadSenha").value;
  const telefone = "123456"; // Pode ser ajustado depois

  const res = await fetch("http://localhost:3000/api/restaurantes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, telefone, email, senha })
  });

  if (res.ok) {
    alert("Restaurante cadastrado com sucesso!");
    voltarInicio();
  } else {
    alert("Erro ao cadastrar restaurante.");
  }
}

async function loginRestaurante() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const senha = document.getElementById("loginSenha").value.trim();

  try {
    const res = await fetch("http://localhost:3000/api/restaurantes");
    const restaurantes = await res.json();

    const encontrado = restaurantes.find(r =>
      r.email?.trim().toLowerCase() === email &&
      r.senha?.trim() === senha
    );

    if (encontrado) {
        restauranteId = encontrado.id || encontrado.id_restaurante;
        localStorage.setItem("restauranteId", restauranteId);   // ✅ já existia
        localStorage.setItem("idRestaurante", restauranteId);   // ✅ adicione
        mostrarPainel();
      } else {
      alert("Email ou senha incorretos.");
    }
  } catch (error) {
    alert("Erro ao tentar logar: " + error.message);
  }
}

// ===== Auto Login =====
window.onload = () => {
  const id = localStorage.getItem("restauranteId");
  if (id && id !== "undefined") {
    restauranteId = id;
    mostrarPainel();
  } else {
    voltarInicio();
  }
};
