const Pedido = require('../model/Pedido');
const PedidoDAO = require('../dao/PedidoDAO');

class PedidoService {
  constructor(dbConfig) {
    this.pedidoDAO = new PedidoDAO(dbConfig);
  }

  async cadastrarPedido(dados) {
    const pedido = new Pedido(
      null,
      dados.idMesa,
      dados.idGarcom,
      dados.status || 'aberto',
      dados.dataHora
    );
    return await this.pedidoDAO.criarPedido(pedido);
  }

  async listarPedidos() {
    return await this.pedidoDAO.listarPedidos();
  }

  async buscarPedido(id) {
    return await this.pedidoDAO.buscarPorId(id);
  }

  async atualizarPedido(id, dadosAtualizados) {
    const pedido = await this.pedidoDAO.buscarPorId(id);
    if (!pedido) throw new Error('Pedido não encontrado');

    pedido.idMesa = dadosAtualizados.idMesa;
    pedido.idGarcom = dadosAtualizados.idGarcom;
    pedido.status = dadosAtualizados.status;
    pedido.dataHora = dadosAtualizados.dataHora;

    await this.pedidoDAO.atualizarPedido(pedido);
  }

  async removerPedido(id) {
    const pedido = await this.pedidoDAO.buscarPorId(id);
    if (!pedido) throw new Error('Pedido não encontrado');

    await this.pedidoDAO.deletarPedido(id);
  }

  async listarPedidosComMesaEGarcom(idRestaurante) {
  return await this.pedidoDAO.listarPedidosComMesaEGarcom(idRestaurante);
}

async obterPedidoAbertoMesa(idMesa){
  return await this.pedidoDAO.buscarPedidoAbertoPorMesa(idMesa);
}

  async finalizarPedido(id) {
  const pedido = await this.pedidoDAO.buscarPorId(id);
  if (!pedido) throw new Error('Pedido não encontrado');
  if (pedido.status === 'finalizado') throw new Error('Pedido já está finalizado');
  await this.pedidoDAO.finalizarPedido(id);
}

}

module.exports = PedidoService;
