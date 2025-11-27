const express = require('express');
const CardapioController = require('../controller/CardapioController');

module.exports = (dbConfig) => {
  const router = express.Router();
  const controller = new CardapioController(dbConfig);

  router.post('/', controller.cadastrar);
  router.get('/', controller.listar);
  router.get('/:id', controller.buscarPorId);
  router.put('/:id', controller.atualizar);
  router.delete('/:id', controller.deletar);
  router.get('/restaurante/:idRestaurante', controller.listarPorRestaurante);


  return router;
};
