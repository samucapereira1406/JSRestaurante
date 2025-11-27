const express = require('express');
const ClienteController = require('../controller/ClienteController');

module.exports = (dbConfig) => {
  const router = express.Router();
  const controller = new ClienteController(dbConfig);

  router.post('/', controller.cadastrar);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', controller.atualizar);
  router.delete('/:id', controller.deletar);

  return router;
};
