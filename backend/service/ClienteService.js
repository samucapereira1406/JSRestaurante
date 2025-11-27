const Cliente = require('../model/Cliente');
const ClienteDAO = require('../dao/ClienteDAO');

class ClienteService {
  constructor(dbConfig) {
    this.clienteDAO = new ClienteDAO(dbConfig);
  }

  async cadastrarCliente(dadosCliente) {
    const cliente = new Cliente(
      null,
      dadosCliente.nome,
      dadosCliente.telefone,
      dadosCliente.email,
      dadosCliente.senha
    );
    return await this.clienteDAO.criarCliente(cliente);
  }

  async listarClientes() {
    return await this.clienteDAO.listarClientes();
  }

  async buscarCliente(id) {
    return await this.clienteDAO.buscarPorId(id);
  }

  async atualizarCliente(id, dadosAtualizados) {
    const clienteExistente = await this.clienteDAO.buscarPorId(id);
    if (!clienteExistente) {
      throw new Error('Cliente não encontrado');
    }

    clienteExistente.nome = dadosAtualizados.nome;
    clienteExistente.telefone = dadosAtualizados.telefone;
    clienteExistente.email = dadosAtualizados.email;
    clienteExistente.senha = dadosAtualizados.senha;

    await this.clienteDAO.atualizarCliente(clienteExistente);
  }

  async removerCliente(id) {
    const clienteExistente = await this.clienteDAO.buscarPorId(id);
    if (!clienteExistente) {
      throw new Error('Cliente não encontrado');
    }

    await this.clienteDAO.deletarCliente(id);
  }
}

module.exports = ClienteService;
