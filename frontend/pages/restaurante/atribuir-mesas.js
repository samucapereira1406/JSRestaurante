const urlParams      = new URLSearchParams(window.location.search);
const garcomId       = urlParams.get("id");
const restauranteId  = localStorage.getItem("idRestaurante")   
                    || localStorage.getItem("restauranteId");   

if (!garcomId || !restauranteId) {
  alert("Garçom ou restaurante não identificado.");
  location.href = "garcons.html";
}

async function carregarMesas() {

  const mesas    = await (await fetch("http://localhost:3000/api/mesas")).json();

  const garcons  = await (await fetch("http://localhost:3000/api/garcons")).json();

  const mesasAtribuidas = new Map();

  for (const g of garcons) {
    const gId = g.id || g.id_garcom;
    if (!gId) continue;

    const res = await fetch(`http://localhost:3000/api/garcons/${gId}/mesas`);
    const atribuicoes = await res.json();           // ← agora sempre array

    for (const m of atribuicoes) {
      const idMesa = m.id_mesa || m.id;
      mesasAtribuidas.set(idMesa, gId);
    }
  }

  const minhas = await (await fetch(
        `http://localhost:3000/api/garcons/${garcomId}/mesas`)).json();
  const minhasIds = minhas.map(m => m.id_mesa || m.id);

  const lista = document.getElementById("listaMesas");
  lista.innerHTML = "";

  mesas
    .filter(m => m.idRestaurante == restauranteId)
    .forEach(m => {
      const idMesa = m.id || m.id_mesa;

      const cb = document.createElement("input");
      cb.type  = "checkbox";
      cb.name  = "mesas";
      cb.id    = `mesa-${idMesa}`;
      cb.value = idMesa;

      const ocupadoPor = mesasAtribuidas.get(idMesa);
      if (minhasIds.includes(idMesa)) cb.checked = true;
      if (ocupadoPor && ocupadoPor != garcomId) cb.disabled = true;

      const label = document.createElement("label");
      label.htmlFor = cb.id;
      label.textContent =
        `Mesa ${m.numero}` + (cb.disabled ? " (já atribuída)" : "");

      const div = document.createElement("div");
      div.append(cb, label);
      lista.appendChild(div);
    });
}

async function salvarAtribuicoes(e) {
  e.preventDefault();

  const selecionadas = [...document.querySelectorAll("input[name='mesas']:checked")]
                        .map(cb => Number(cb.value));

  const atuais = await (await fetch(
        `http://localhost:3000/api/garcons/${garcomId}/mesas`)).json();
  const atuaisIds = atuais.map(m => m.id_mesa || m.id);

  const adicionar = selecionadas.filter(x => !atuaisIds.includes(x));
  const remover   = atuaisIds   .filter(x => !selecionadas.includes(x));

  for (const idMesa of adicionar) {
    const res = await fetch(
      `http://localhost:3000/api/garcons/${garcomId}/mesas/${idMesa}`, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ idRestaurante: restauranteId })
      });
    if (!res.ok) {
      const err = await res.json();
      alert(`Erro ao atribuir mesa ${idMesa}: ${err.error}`);
    }
  }

  for (const idMesa of remover) {
    await fetch(
      `http://localhost:3000/api/garcons/${garcomId}/mesas/${idMesa}`,
      { method: "DELETE" });
  }

  alert("Atribuições salvas!");
  location.href = "garcons.html";
}

document
  .getElementById("formMesas")
  .addEventListener("submit", salvarAtribuicoes);

window.onload = carregarMesas;
