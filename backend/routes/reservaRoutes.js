const express = require('express');
const ReservaController = require('../controller/ReservaController');

module.exports = (dbConfig) => {
  const router = express.Router();
  const controller = new ReservaController(dbConfig);

  router.post('/', controller.cadastrar);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', controller.atualizar);
  router.delete('/:id', controller.deletar);

  return router;
};
