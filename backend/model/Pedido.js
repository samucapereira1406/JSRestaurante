class Pedido {
  constructor(id, idMesa, idGarcom, status, dataHora) {
    this.id = id;
    this.idMesa = idMesa;
    this.idGarcom = idGarcom;
    this.status = status; // 'aberto' ou 'finalizado'
    this.dataHora = dataHora; // formato 'YYYY-MM-DD HH:MM:SS'
  }
}

module.exports = Pedido;
