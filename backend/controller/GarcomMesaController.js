const GarcomMesaService = require('../service/GarcomMesaService');

class GarcomMesaController {
  constructor(dbConfig) {
    this.garcomMesaService = new GarcomMesaService(dbConfig);
  }

  associar = async (req, res) => {
    try {
      const { idGarcom, idMesa } = req.params;
      const { idRestaurante } = req.body;

      if (!idRestaurante) {
        return res.status(400).json({ error: 'idRestaurante é obrigatório.' });
      }

      await this.garcomMesaService.associar(idGarcom, idMesa, idRestaurante);
      res.status(201).json({ message: 'Garçom associado à mesa com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listarMesas = async (req, res) => {
  try {
    const { idGarcom } = req.params;
    if (!idGarcom) {
      return res.status(400).json({ error: 'ID do garçom não informado.' });
    }

    const mesas = await this.garcomMesaService.listarMesasPorGarcom(idGarcom);
    res.status(200).json(mesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  remover = async (req, res) => {
    try {
      const { idGarcom, idMesa } = req.params;
      await this.garcomMesaService.removerAssociacao(idGarcom, idMesa);
      res.status(200).json({ message: 'Associação removida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listarTodas = async (req, res) => {
    try {
      const dados = await this.garcomMesaService.listarTodasAssociacoes();
      res.status(200).json(dados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = GarcomMesaController;
