const express = require('express');
const ItemPedidoController = require('../controller/ItemPedidoController');

module.exports = (dbConfig) => {
  const router = express.Router();
  const controller = new ItemPedidoController(dbConfig);

  router.post('/:idPedido/itens', controller.adicionar);
  router.get('/:idPedido/itens', controller.listar);
  router.delete('/item/:idItemPedido', controller.deletar);
  router.delete('/:idPedido/itens', controller.limpar);

  return router;
};
