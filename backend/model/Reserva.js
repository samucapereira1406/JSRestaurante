class Reserva {
  constructor(id, idCliente, idMesa, dataHora) {
    this.id = id;
    this.idCliente = idCliente;
    this.idMesa = idMesa;
    this.dataHora = dataHora; // formato: 'YYYY-MM-DD HH:MM:SS'
  }
}

module.exports = Reserva;
