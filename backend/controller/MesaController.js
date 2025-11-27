const MesaService = require('../service/MesaService');

class MesaController {
  constructor(dbConfig) {
    this.mesaService = new MesaService(dbConfig);
  }

  cadastrar = async (req, res) => {
    try {
      const id = await this.mesaService.cadastrarMesa(req.body);
      res.status(201).json({ id, message: 'Mesa cadastrada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const mesas = await this.mesaService.listarMesas();
      res.status(200).json(mesas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const mesa = await this.mesaService.buscarMesa(req.params.id);
      if (mesa) {
        res.status(200).json(mesa);
      } else {
        res.status(404).json({ message: 'Mesa não encontrada.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  atualizar = async (req, res) => {
    try {
      await this.mesaService.atualizarMesa(req.params.id, req.body);
      res.status(200).json({ message: 'Mesa atualizada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deletar = async (req, res) => {
    try {
      await this.mesaService.removerMesa(req.params.id);
      res.status(200).json({ message: 'Mesa deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = MesaController;
