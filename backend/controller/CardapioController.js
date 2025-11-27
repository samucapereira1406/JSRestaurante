const CardapioService = require('../service/CardapioService');

class CardapioController {
  constructor(dbConfig) {
    this.cardapioService = new CardapioService(dbConfig);
  }

  cadastrar = async (req, res) => {
    try {
      const id = await this.cardapioService.cadastrarItem(req.body);
      res.status(201).json({ id, message: 'Item do cardápio cadastrado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const itens = await this.cardapioService.listarItens();
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const item = await this.cardapioService.buscarItem(req.params.id);
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: 'Item não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  atualizar = async (req, res) => {
    try {
      await this.cardapioService.atualizarItem(req.params.id, req.body);
      res.status(200).json({ message: 'Item atualizado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deletar = async (req, res) => {
    try {
      await this.cardapioService.removerItem(req.params.id);
      res.status(200).json({ message: 'Item deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  listarPorRestaurante = async (req, res) => {
  try {
    const { idRestaurante } = req.params;
    const itens = await this.cardapioService.listarItensPorRestaurante(idRestaurante);
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

}

module.exports = CardapioController;
