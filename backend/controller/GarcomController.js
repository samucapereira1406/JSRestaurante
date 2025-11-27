const GarcomService = require('../service/GarcomService');

class GarcomController {
  constructor(dbConfig) {
    this.garcomService = new GarcomService(dbConfig);
  }

  cadastrar = async (req, res) => {
    try {
      const id = await this.garcomService.cadastrarGarcom(req.body);
      res.status(201).json({ id, message: 'Garçom cadastrado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const garcons = await this.garcomService.listarGarcons();
      res.status(200).json(garcons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const garcom = await this.garcomService.buscarGarcom(req.params.id);
      if (garcom) {
        res.status(200).json(garcom);
      } else {
        res.status(404).json({ message: 'Garçom não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  atualizar = async (req, res) => {
    try {
      await this.garcomService.atualizarGarcom(req.params.id, req.body);
      res.status(200).json({ message: 'Garçom atualizado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deletar = async (req, res) => {
    try {
      await this.garcomService.removerGarcom(req.params.id);
      res.status(200).json({ message: 'Garçom removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = GarcomController;
