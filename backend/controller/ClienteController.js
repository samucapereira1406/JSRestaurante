const ClienteService = require('../service/ClienteService');

class ClienteController {
  constructor(dbConfig) {
    this.clienteService = new ClienteService(dbConfig);
  }

  cadastrar = async (req, res) => {
    try {
      const id = await this.clienteService.cadastrarCliente(req.body);
      res.status(201).json({ id, message: 'Cliente cadastrado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const clientes = await this.clienteService.listarClientes();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const cliente = await this.clienteService.buscarCliente(req.params.id);
      if (cliente) {
        res.status(200).json(cliente);
      } else {
        res.status(404).json({ message: 'Cliente não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  atualizar = async (req, res) => {
    try {
      await this.clienteService.atualizarCliente(req.params.id, req.body);
      res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deletar = async (req, res) => {
    try {
      await this.clienteService.removerCliente(req.params.id);
      res.status(200).json({ message: 'Cliente removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ClienteController;
