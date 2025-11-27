
const mesaId   = localStorage.getItem("mesaSelecionada");
const garcomId = localStorage.getItem("garcomId");
let   pedidoId = null;                    // será preenchido quando existir
let   itens    = [];                      // [{idItem,nome,preco,quantidade}]

if (!mesaId || !garcomId) {
  alert("Acesso inválido"); 
  location.href = "garcomLogin.html";
}

document.getElementById("mesaInfo").textContent = `Mesa ${mesaId}`;

async function carregarCardapio() {
  const restId = localStorage.getItem("restauranteId");
  const r  = await fetch(`http://localhost:3000/api/cardapio/restaurante/${restId}`);
  const cd = await r.json();

  const sel = document.getElementById("cardapioSelect");
  sel.innerHTML = '<option disabled selected>Escolha um item</option>';

  cd.forEach(it => {
    const o = document.createElement("option");
    o.value           = it.id || it.id_item;
    o.dataset.nome    = it.nome;
    o.dataset.preco   = it.preco;
    o.textContent     = `${it.nome} – R$ ${(Number(it.preco)).toFixed(2)}`;
    sel.appendChild(o);
  });
}

async function carregarPedidoExistente() {
  try {
    const r = await fetch(`http://localhost:3000/api/pedidos/mesa/${mesaId}/aberto`);
    if (!r.ok) return;                        // não há pedido aberto
    const ped = await r.json();
    if (!ped || !ped.id) return;

    pedidoId = ped.id;
    itens    = ped.itens || [];
    atualizarLista();
  } catch (err) {
    console.error("Erro ao buscar pedido aberto:", err);
  }
}

function totalPedido() {
  return itens.reduce((s, i) => s + i.preco * i.quantidade, 0);
}

function atualizarLista() {
  const ul = document.getElementById("listaItens");
  ul.innerHTML = "";

  itens.forEach((i, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${i.nome} – Qtd:${i.quantidade} – R$ ${(i.preco * i.quantidade).toFixed(2)}
      <button class="mini" onclick="removerItem(${idx})">Remover</button>
    `;
    ul.appendChild(li);
  });

  document.getElementById("totalPedido").textContent =
      `Total: R$ ${totalPedido().toFixed(2)}`;
}

async function criaPedidoSeNecessario() {
  if (pedidoId) return;                        

  const dataHora = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const r = await fetch("http://localhost:3000/api/pedidos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idMesa: mesaId,
      idGarcom: garcomId,
      status: "aberto",
      dataHora
    })
  });
  const d = await r.json();
  pedidoId = d.id;
}

async function adicionarItem() {
  await criaPedidoSeNecessario();

  const sel     = document.getElementById("cardapioSelect");
  const idItem  = Number(sel.value);
  if (!idItem) { alert("Escolha o item"); return; }

  const qtd     = Number(document.getElementById("quantidade").value || 1);
  const nome    = sel.options[sel.selectedIndex].dataset.nome;
  const preco   = Number(sel.options[sel.selectedIndex].dataset.preco);

  const r = await fetch(`http://localhost:3000/api/pedidos/${pedidoId}/itens`, {
    method : "POST",
    headers: { "Content-Type": "application/json" },
    body   : JSON.stringify({ idItem, quantidade: qtd })
  });
  if (!r.ok) { alert("Erro ao adicionar item"); return; }

  itens.push({ idItem, nome, preco, quantidade: qtd });
  atualizarLista();
}

function removerItem(idx) {
  // Em um sistema completo, também removeríamos no backend
  itens.splice(idx, 1);
  atualizarLista();
}

function confirmarPagamento() {
  if (!itens.length) { alert("Nenhum item no pedido."); return; }
  document.getElementById("btnFinalizar").style.display = "block";
  document.getElementById("btnConfirmar").disabled = true;
  alert("Pagamento confirmado (simulação)");
}

async function finalizarMesa() {
  if (!pedidoId) return;

  const ok = confirm("Finalizar pedido?");
  if (!ok) return;

  await fetch(`http://localhost:3000/api/pedidos/${pedidoId}/finalizar`, {
  method: "PATCH"
});
alert("Mesa finalizada!");
location.href = "/frontend/pages/Garcom/painel.html";
}

function voltarPainel() {
  location.href = "/frontend/pages/Garcom/painel.html";
}



window.onload = async () => {
  await carregarCardapio();
  await carregarPedidoExistente();
};
