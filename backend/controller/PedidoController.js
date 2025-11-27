const PedidoService = require('../service/PedidoService');

class PedidoController {
  constructor(dbConfig) {
    this.pedidoService = new PedidoService(dbConfig);
  }

  cadastrar = async (req, res) => {
    try {
      const id = await this.pedidoService.cadastrarPedido(req.body);
      res.status(201).json({ id, message: 'Pedido criado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const pedidos = await this.pedidoService.listarPedidos();
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const pedido = await this.pedidoService.buscarPedido(req.params.id);
      if (pedido) {
        res.status(200).json(pedido);
      } else {
        res.status(404).json({ message: 'Pedido não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  obterAbertoPorMesa = async (req,res)=>{
    try{
      const data = await this.pedidoService.obterPedidoAbertoMesa(req.params.idMesa);
      if (!data) return res.status(404).json({msg:'Sem pedido aberto'});
      res.json(data);
    }catch(e){ res.status(500).json({error:e.message}); }
  };

  atualizar = async (req, res) => {
    try {
      await this.pedidoService.atualizarPedido(req.params.id, req.body);
      res.status(200).json({ message: 'Pedido atualizado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deletar = async (req, res) => {
    try {
      await this.pedidoService.removerPedido(req.params.id);
      res.status(200).json({ message: 'Pedido removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listarPedidosDetalhado = async (req, res) => {
  try {
    const idRestaurante = parseInt(req.params.idRestaurante);
    const dados = await this.pedidoService.listarPedidosComMesaEGarcom(idRestaurante);
    res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  finalizar = async (req, res) => {
  try {
    await this.pedidoService.finalizarPedido(req.params.id);
    res.status(200).json({ message: 'Pedido finalizado e mesa liberada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

}

module.exports = PedidoController;
