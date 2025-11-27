const Mesa = require('../model/Mesa');
const MesaDAO = require('../dao/MesaDAO');

class MesaService {
  constructor(dbConfig) {
    this.mesaDAO = new MesaDAO(dbConfig);
  }

  async cadastrarMesa(dados) {
    const mesa = new Mesa(
      null,
      dados.numero,
      dados.capacidade,
      dados.status || 'disponivel',
      dados.idRestaurante
    );
    return await this.mesaDAO.criarMesa(mesa);
  }

  async listarMesas() {
    return await this.mesaDAO.listarMesas();
  }

  async buscarMesa(id) {
    return await this.mesaDAO.buscarPorId(id);
  }

  async atualizarMesa(id, dadosAtualizados) {
    const mesa = await this.mesaDAO.buscarPorId(id);
    if (!mesa) {
      throw new Error('Mesa não encontrada');
    }

    mesa.numero = dadosAtualizados.numero;
    mesa.capacidade = dadosAtualizados.capacidade;
    mesa.status = dadosAtualizados.status;
    mesa.idRestaurante = dadosAtualizados.idRestaurante;

    await this.mesaDAO.atualizarMesa(mesa);
  }

  async removerMesa(id) {
    const mesa = await this.mesaDAO.buscarPorId(id);
    if (!mesa) {
      throw new Error('Mesa não encontrada');
    }

    await this.mesaDAO.deletarMesa(id);
  }
}

module.exports = MesaService;
