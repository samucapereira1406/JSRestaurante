class Mesa {
  constructor(id, numero, capacidade, status, idRestaurante) {
    this.id = id;
    this.numero = numero;
    this.capacidade = capacidade;
    this.status = status; // 'disponivel' ou 'ocupada'
    this.idRestaurante = idRestaurante;
  }
}

module.exports = Mesa;
