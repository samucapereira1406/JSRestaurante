const Restaurante = require('../model/Restaurante');
const RestauranteDAO = require('../dao/RestauranteDAO');

class RestauranteService {
  constructor(dbConfig) {
    this.restauranteDAO = new RestauranteDAO(dbConfig);
  }

  async cadastrarRestaurante(dados) {
    const restaurante = new Restaurante(
      null,
      dados.nome,
      dados.telefone,
      dados.email,
      dados.senha
    );
    return await this.restauranteDAO.criarRestaurante(restaurante);
  }

  async listarRestaurantes() {
    return await this.restauranteDAO.listarRestaurantes();
  }

  async buscarRestaurante(id) {
    return await this.restauranteDAO.buscarPorId(id);
  }

  async atualizarRestaurante(id, dadosAtualizados) {
    const restaurante = await this.restauranteDAO.buscarPorId(id);
    if (!restaurante) {
      throw new Error('Restaurante não encontrado');
    }

    restaurante.nome = dadosAtualizados.nome;
    restaurante.telefone = dadosAtualizados.telefone;
    restaurante.email = dadosAtualizados.email;
    restaurante.senha = dadosAtualizados.senha;

    await this.restauranteDAO.atualizarRestaurante(restaurante);
  }

  async removerRestaurante(id) {
    const restaurante = await this.restauranteDAO.buscarPorId(id);
    if (!restaurante) {
      throw new Error('Restaurante não encontrado');
    }

    await this.restauranteDAO.deletarRestaurante(id);
  }
}

module.exports = RestauranteService;
