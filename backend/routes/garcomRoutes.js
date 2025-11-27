const express = require('express');
const GarcomController = require('../controller/GarcomController');

module.exports = (dbConfig) => {
  const router = express.Router();
  const controller = new GarcomController(dbConfig);

  router.post('/', controller.cadastrar);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', controller.atualizar);
  router.delete('/:id', controller.deletar);

  return router;
};
