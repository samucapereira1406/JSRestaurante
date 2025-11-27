const Reserva = require('../model/Reserva');
const ReservaDAO = require('../dao/ReservaDAO');

class ReservaService {
  constructor(dbConfig) {
    this.reservaDAO = new ReservaDAO(dbConfig);
  }

  async cadastrarReserva(dados) {
    const reserva = new Reserva(
      null,
      dados.idCliente,
      dados.idMesa,
      dados.dataHora,
    );
    return await this.reservaDAO.criarReserva(reserva);
  }

  async listarReservas() {
    return await this.reservaDAO.listarReservas();
  }

  async buscarReserva(id) {
    return await this.reservaDAO.buscarPorId(id);
  }

  async atualizarReserva(id, dadosAtualizados) {
    const reserva = await this.reservaDAO.buscarPorId(id);
    if (!reserva) {
      throw new Error('Reserva não encontrada');
    }

    reserva.idCliente = dadosAtualizados.idCliente;
    reserva.idMesa = dadosAtualizados.idMesa;
    reserva.dataHora = dadosAtualizados.dataHora;

    await this.reservaDAO.atualizarReserva(reserva);
  }

  async removerReserva(id) {
    const reserva = await this.reservaDAO.buscarPorId(id);
    if (!reserva) {
      throw new Error('Reserva não encontrada');
    }

    await this.reservaDAO.deletarReserva(id);
  }
}

module.exports = ReservaService;
