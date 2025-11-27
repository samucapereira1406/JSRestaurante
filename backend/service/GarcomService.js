const Garcom = require('../model/Garcom');
const GarcomDAO = require('../dao/GarcomDAO');

class GarcomService {
  constructor(dbConfig) {
    this.garcomDAO = new GarcomDAO(dbConfig);
  }

  async cadastrarGarcom(dados) {
    const garcom = new Garcom(
      null,
      dados.nome,
      dados.email,
      dados.senha,
      dados.idRestaurante
    );
    return await this.garcomDAO.criarGarcom(garcom);
  }

  async listarGarcons() {
    return await this.garcomDAO.listarGarcons();
  }

  async buscarGarcom(id) {
    return await this.garcomDAO.buscarPorId(id);
  }

  async atualizarGarcom(id, dadosAtualizados) {
    const garcom = await this.garcomDAO.buscarPorId(id);
    if (!garcom) throw new Error('Garçom não encontrado');

    garcom.nome = dadosAtualizados.nome;
    garcom.email = dadosAtualizados.email;
    garcom.senha = dadosAtualizados.senha;
    garcom.idRestaurante = dadosAtualizados.idRestaurante;

    await this.garcomDAO.atualizarGarcom(garcom);
  }

  async removerGarcom(id) {
    const garcom = await this.garcomDAO.buscarPorId(id);
    if (!garcom) throw new Error('Garçom não encontrado');
    await this.garcomDAO.deletarGarcom(id);
  }
}

module.exports = GarcomService;
