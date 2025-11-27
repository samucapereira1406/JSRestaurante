async function loginGarcom() {
  const email = document.getElementById('emailGarcom').value.trim().toLowerCase();
  const senha = document.getElementById('senhaGarcom').value.trim();

  const restauranteId = localStorage.getItem('restauranteId');
  if (!restauranteId) {
    alert('Faça login como restaurante antes de acessar o módulo de garçons.');
    window.location.href = '../index.html';      // volta pro login principal
    return;
  }

  const resp      = await fetch('http://localhost:3000/api/garcons');
  if (!resp.ok) { alert('Erro ao tentar logar'); return; }
  const garcons   = await resp.json();
  const garcom    = garcons.find(g =>
      g.email?.toLowerCase() === email && g.senha === senha &&
      (g.id_restaurante ?? g.idRestaurante) == restauranteId);

  if (!garcom) { alert('E-mail ou senha inválidos'); return; }

  localStorage.setItem('garcomId',   garcom.id_garcom ?? garcom.id);
  localStorage.setItem('garcomNome', garcom.nome);

  if (!localStorage.getItem('restauranteId')) {
    localStorage.setItem('restauranteId', garcom.id_restaurante ?? garcom.idRestaurante);
  }

  alert(`Bem-vindo, ${garcom.nome}!`);
  window.location.href = './painel.html';        // painel do garçom
}
