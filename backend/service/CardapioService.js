const Cardapio = require('../model/Cardapio');
const CardapioDAO = require('../dao/CardapioDAO');

class CardapioService {
  constructor(dbConfig) {
    this.cardapioDAO = new CardapioDAO(dbConfig);
  }

  async cadastrarItem(dados) {
    const item = new Cardapio(null, dados.nome, dados.preco, dados.idRestaurante);
    return await this.cardapioDAO.criarItem(item);
  }

  async listarItens() {
    return await this.cardapioDAO.listarItens();
  }

  async buscarItem(id) {
    return await this.cardapioDAO.buscarPorId(id);
  }

  async atualizarItem(id, dadosAtualizados) {
    const item = await this.cardapioDAO.buscarPorId(id);
    if (!item) throw new Error('Item não encontrado');

    item.nome = dadosAtualizados.nome;
    item.preco = dadosAtualizados.preco;
    item.idRestaurante = dadosAtualizados.idRestaurante;

    await this.cardapioDAO.atualizarItem(item);
  }

  async removerItem(id) {
    const item = await this.cardapioDAO.buscarPorId(id);
    if (!item) throw new Error('Item não encontrado');

    await this.cardapioDAO.deletarItem(id);
  }
  
  async listarItensPorRestaurante(idRestaurante) {
  return await this.cardapioDAO.listarItensPorRestaurante(idRestaurante);
}

}

module.exports = CardapioService;
