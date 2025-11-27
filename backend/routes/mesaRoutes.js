const express = require('express');
const MesaController = require('../controller/MesaController');

module.exports = (dbConfig) => {
  const router = express.Router();
  const controller = new MesaController(dbConfig);

  router.post('/', controller.cadastrar);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', controller.atualizar);
  router.delete('/:id', controller.deletar);

  return router;
};
