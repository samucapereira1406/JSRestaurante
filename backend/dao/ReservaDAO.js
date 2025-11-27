const mysql = require('mysql2/promise');
const Reserva = require('../model/Reserva');

class ReservaDAO {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async criarReserva(reserva) {
  try {
    const connection = await mysql.createConnection(this.dbConfig);

    // Verifica se já existe reserva para a mesma mesa e dia
    const [existe] = await connection.execute(
      `SELECT * FROM reserva 
       WHERE id_mesa = ? AND DATE(data_hora) = DATE(?)`,
      [reserva.idMesa, reserva.dataHora]
    );

    if (existe.length > 0) {
      connection.end();
      throw new Error('Esta mesa já está reservada para este dia.');
    }

    // Cria a reserva
    const query = 'INSERT INTO reserva (id_cliente, id_mesa, data_hora) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [
      reserva.idCliente,
      reserva.idMesa,
      reserva.dataHora
    ]);

    // Atualiza o status da mesa para ocupada
    await connection.execute(
      'UPDATE mesa SET status = ? WHERE id_mesa = ?',
      ['ocupada', reserva.idMesa]
    );

    connection.end();
    return result.insertId;

  } catch (error) {
    throw new Error('Erro ao criar reserva: ' + error.message);
  }
}

  async listarReservas() {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = `
        SELECT 
          r.id_reserva,
          r.id_cliente,
          cli.nome AS nome_cliente,
          r.id_mesa,
          r.data_hora,
          res.nome AS nome_restaurante,
          m.numero AS numero_mesa,
          m.capacidade AS Pessoas
        FROM reserva r
        JOIN cliente cli ON r.id_cliente = cli.id_cliente
        JOIN mesa m ON r.id_mesa = m.id_mesa
        JOIN restaurante res ON m.id_restaurante = res.id_restaurante;
      `;
      const [rows] = await connection.execute(query);
      connection.end();

      return rows.map(row => ({
        id: row.id_reserva,
        idCliente: row.id_cliente,
        nomeCliente: row.nome_cliente,
        idMesa: row.id_mesa,
        dataHora: row.data_hora,
        numeroMesa: row.numero_mesa,
        nomeRestaurante: row.nome_restaurante
      }));
    } catch (error) {
      throw new Error('Erro ao listar reservas: ' + error.message);
    }
  }

  async buscarPorId(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM reserva WHERE id_reserva = ?', [id]);
      connection.end();
      if (rows.length > 0) {
        const row = rows[0];
        return new Reserva(row.id_reserva, row.id_cliente, row.id_mesa, row.data_hora);
      }
      return null;
    } catch (error) {
      throw new Error('Erro ao buscar reserva por ID: ' + error.message);
    }
  }

  async atualizarReserva(reserva) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'UPDATE reserva SET id_cliente = ?, id_mesa = ?, data_hora = ? WHERE id_reserva = ?';
      await connection.execute(query, [
        reserva.idCliente,
        reserva.idMesa,
        reserva.dataHora,
        reserva.id,
      ]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao atualizar reserva: ' + error.message);
    }
  }

  async deletarReserva(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute('DELETE FROM reserva WHERE id_reserva = ?', [id]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao deletar reserva: ' + error.message);
    }
  }
}

module.exports = ReservaDAO;
