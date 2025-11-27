const ReservaService = require('../service/ReservaService');

class ReservaController {
  constructor(dbConfig) {
    this.reservaService = new ReservaService(dbConfig);
  }

  cadastrar = async (req, res) => {
    try {
      const id = await this.reservaService.cadastrarReserva(req.body);
      res.status(201).json({ id, message: 'Reserva criada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const reservas = await this.reservaService.listarReservas();
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const reserva = await this.reservaService.buscarReserva(req.params.id);
      if (reserva) {
        res.status(200).json(reserva);
      } else {
        res.status(404).json({ message: 'Reserva não encontrada.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  atualizar = async (req, res) => {
    try {
      await this.reservaService.atualizarReserva(req.params.id, req.body);
      res.status(200).json({ message: 'Reserva atualizada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deletar = async (req, res) => {
    try {
      await this.reservaService.removerReserva(req.params.id);
      res.status(200).json({ message: 'Reserva removida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ReservaController;
