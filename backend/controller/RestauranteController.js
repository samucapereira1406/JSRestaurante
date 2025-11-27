const RestauranteService = require('../service/RestauranteService');

class RestauranteController {
  constructor(dbConfig) {
    this.restauranteService = new RestauranteService(dbConfig);
  }

  cadastrar = async (req, res) => {
    try {
      const id = await this.restauranteService.cadastrarRestaurante(req.body);
      res.status(201).json({ id, message: 'Restaurante cadastrado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const restaurantes = await this.restauranteService.listarRestaurantes();
      res.status(200).json(restaurantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const restaurante = await this.restauranteService.buscarRestaurante(req.params.id);
      if (restaurante) {
        res.status(200).json(restaurante);
      } else {
        res.status(404).json({ message: 'Restaurante não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  atualizar = async (req, res) => {
    try {
      await this.restauranteService.atualizarRestaurante(req.params.id, req.body);
      res.status(200).json({ message: 'Restaurante atualizado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deletar = async (req, res) => {
    try {
      await this.restauranteService.removerRestaurante(req.params.id);
      res.status(200).json({ message: 'Restaurante deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = RestauranteController;
