const ItemPedidoService = require('../service/ItemPedidoService');

class ItemPedidoController {
  constructor(dbConfig) {
    this.itemPedidoService = new ItemPedidoService(dbConfig);
  }

  adicionar = async (req, res) => {
    try {
      const dados = { ...req.body, idPedido: req.params.idPedido };
      const id = await this.itemPedidoService.adicionarItemAoPedido(dados);
      res.status(201).json({ id, message: 'Item adicionado ao pedido.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const itens = await this.itemPedidoService.listarItensDoPedido(req.params.idPedido);
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deletar = async (req, res) => {
    try {
      await this.itemPedidoService.deletarItem(req.params.idItemPedido);
      res.status(200).json({ message: 'Item removido do pedido.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  limpar = async (req, res) => {
    try {
      await this.itemPedidoService.limparPedido(req.params.idPedido);
      res.status(200).json({ message: 'Todos os itens foram removidos do pedido.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ItemPedidoController;
