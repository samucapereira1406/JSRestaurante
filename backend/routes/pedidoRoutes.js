const express = require('express');
const PedidoController = require('../controller/PedidoController');

module.exports = (dbConfig) => {
  const router = express.Router();
  const controller = new PedidoController(dbConfig);

  router.post('/', controller.cadastrar);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', controller.atualizar);
  router.delete('/:id', controller.deletar);
  router.patch('/:id/finalizar', controller.finalizar);
  router.get('/relatorio/:idRestaurante', controller.listarPedidosDetalhado);
  router.get('/mesa/:idMesa/aberto', controller.obterAbertoPorMesa);


  return router;
};
