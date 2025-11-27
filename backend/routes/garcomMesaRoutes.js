const express = require('express');
const GarcomMesaController = require('../controller/GarcomMesaController');

module.exports = (dbConfig) => {
  const router = express.Router();
  const controller = new GarcomMesaController(dbConfig);

  // Associa uma mesa a um garçom (requer id_restaurante no body)
  router.post('/:idGarcom/mesas/:idMesa', controller.associar);

  // Lista mesas de um garçom
  router.get('/:idGarcom/mesas', controller.listarMesas);

  // Remove associação
  router.delete('/:idGarcom/mesas/:idMesa', controller.remover);

  // Rota opcional: lista todas as associações de garçom-mesa (para o frontend)
  router.get('/associacoes', controller.listarTodas);

  return router;
};
