const ItemPedido = require('../model/ItemPedido');
const ItemPedidoDAO = require('../dao/ItemPedidoDAO');

class ItemPedidoService {
  constructor(dbConfig) {
    this.itemPedidoDAO = new ItemPedidoDAO(dbConfig);
  }

  async adicionarItemAoPedido(dados) {
    const item = new ItemPedido(null, dados.idPedido, dados.idItem, dados.quantidade);
    return await this.itemPedidoDAO.adicionarItem(item);
  }

  async listarItensDoPedido(idPedido) {
    return await this.itemPedidoDAO.listarPorPedido(idPedido);
  }

  async deletarItem(idItemPedido) {
    await this.itemPedidoDAO.deletarItem(idItemPedido);
  }

  async limparPedido(idPedido) {
    await this.itemPedidoDAO.limparPedido(idPedido);
  }
}

module.exports = ItemPedidoService;
