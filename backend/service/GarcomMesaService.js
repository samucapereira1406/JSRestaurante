const GarcomMesaDAO = require('../dao/GarcomMesaDAO');

class GarcomMesaService {
  constructor(dbConfig) {
    this.garcomMesaDAO = new GarcomMesaDAO(dbConfig);
  }

  async associar(idGarcom, idMesa, idRestaurante) {
    return await this.garcomMesaDAO.associarGarcomMesa(idGarcom, idMesa, idRestaurante);
  }

  async listarMesasPorGarcom(idGarcom) {
    return await this.garcomMesaDAO.listarMesasPorGarcom(idGarcom);
  }

  async removerAssociacao(idGarcom, idMesa) {
    return await this.garcomMesaDAO.removerAssociacao(idGarcom, idMesa);
  }

  async listarTodasAssociacoes() {
    return await this.garcomMesaDAO.listarTodasAssociacoes();
  }
}

module.exports = GarcomMesaService;
