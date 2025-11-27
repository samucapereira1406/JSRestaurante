const express = require('express');
const RestauranteController = require('../controller/RestauranteController');

module.exports = (dbConfig) => {
  const router = express.Router();
  const controller = new RestauranteController(dbConfig);

  router.post('/', controller.cadastrar);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', controller.atualizar);
  router.delete('/:id', controller.deletar);

  return router;
};
