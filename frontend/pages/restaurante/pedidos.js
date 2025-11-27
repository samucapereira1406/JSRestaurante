/* -------------- pedidos.js ---------------- */
const API_BASE = "http://localhost:3000/api";

/* botão “Acesso Garçom” */
document
  .getElementById("btnAcessoGarcom")
  .addEventListener("click", () =>
    (window.location.href = "../Garcom/garcomLogin.html")
  );

window.onload = carregarPedidos;

async function carregarPedidos() {
  const container = document.getElementById("listaPedidos");
  container.innerHTML = "";                   // limpa

  let pedidos = [];

  /* 1. tenta rota detalhada ----------------------------------------------- */
  try {
    const r = await fetch(`${API_BASE}/pedidos/detalhado`);
    if (r.ok) pedidos = await r.json();
    else if (r.status !== 404) throw new Error("Erro ao buscar pedidos.");
  } catch (e) {
    console.warn("rota /detalhado indisponível, usando fallback", e.message);
  }

  /* 2. fallback simples ---------------------------------------------------- */
  if (!Array.isArray(pedidos) || !pedidos.length) {
    try {
      const r = await fetch(`${API_BASE}/pedidos`);
      if (r.ok) pedidos = await r.json();
      else throw new Error("Erro ao buscar pedidos.");
    } catch (e) {
      console.error(e);
      container.innerHTML =
        `<p style="color:red;text-align:center">Erro ao carregar pedidos.</p>`;
      return;
    }
  }

  /* garante array */
  if (!Array.isArray(pedidos)) pedidos = [pedidos];

  const abertos     = pedidos.filter(p => p.status !== "finalizado");
  const finalizados = pedidos.filter(p => p.status === "finalizado");

  container.appendChild(criarSecao("Pedidos Abertos", abertos));
  container.appendChild(criarSecao("Pedidos Finalizados", finalizados, true));
}

/* cria bloco de pedidos ---------------------------------------------------- */
function criarSecao(titulo, lista, isFinalizado = false) {
  const sec = document.createElement("section");
  sec.className = "secao-pedidos";

  const h2 = document.createElement("h2");
  h2.textContent = titulo;
  sec.appendChild(h2);

  if (!lista.length) {
    sec.innerHTML += `<p style="text-align:center;color:#666">Nenhum ${titulo.toLowerCase()}.</p>`;
    return sec;
  }

  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "pedido";

    const h3 = document.createElement("h3");
    h3.textContent = `#${p.id} • Mesa ${p.numeroMesa ?? p.id_mesa ?? "?"} • Garçom: ${p.nomeGarcom ?? "—"}`;
    card.appendChild(h3);

    /* tabela itens -------------------------------------------------------- */
    const tbody = (p.itens ?? []).map(it => `
      <tr>
        <td>${it.nome ?? it.item ?? "—"}</td>
        <td>${it.quantidade}</td>
        <td>R$ ${Number(it.valor_unitario ?? it.preco).toFixed(2)}</td>
        <td>R$ ${(Number(it.valor_unitario ?? it.preco) * it.quantidade).toFixed(2)}</td>
      </tr>`).join("");

    card.innerHTML += `
      <table class="itens-table">
        <thead><tr>
          <th>Item</th><th>Qtd</th><th>V. Unit</th><th>Total</th>
        </tr></thead>
        <tbody>${tbody}</tbody>
      </table>`;

    /* botão finalizar ----------------------------------------------------- */
    if (!isFinalizado) {
      const btn = document.createElement("button");
      btn.className = "finalizar-btn";
      btn.textContent = "Finalizar Pedido";
      btn.onclick = () => finalizarPedido(p.id);
      card.appendChild(btn);
    } else {
      card.innerHTML += `<p style="color:green;text-align:right">Finalizado</p>`;
    }

    sec.appendChild(card);
  });

  return sec;
}

/* finaliza e recarrega ----------------------------------------------------- */
async function finalizarPedido(id) {
  if (!confirm("Finalizar este pedido / liberar mesa?")) return;

  const r = await fetch(`${API_BASE}/pedidos/${id}/finalizar`, { method: "PATCH" });

  if (r.ok) {
    alert("Pedido finalizado.");
    carregarPedidos();
  } else {
    alert("Erro ao finalizar.");
  }
}

document.getElementById("btnAcessoGarcom").addEventListener("click", () => {
  window.location.href = "../Garcom/garcomLogin.html";
});

window.onload = carregarPedidos;
