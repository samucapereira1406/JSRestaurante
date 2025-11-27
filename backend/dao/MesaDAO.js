const mysql = require('mysql2/promise');
const Mesa = require('../model/Mesa');

class MesaDAO {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async criarMesa(mesa) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'INSERT INTO mesa (numero, capacidade, status, id_restaurante) VALUES (?, ?, ?, ?)';
      const [result] = await connection.execute(query, [
        mesa.numero,
        mesa.capacidade,
        mesa.status,
        mesa.idRestaurante
      ]);
      connection.end();
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao criar mesa: ' + error.message);
    }
  }

  async listarMesas() {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM mesa');
      connection.end();
      return rows.map(row => new Mesa(row.id_mesa, row.numero, row.capacidade, row.status, row.id_restaurante));
    } catch (error) {
      throw new Error('Erro ao listar mesas: ' + error.message);
    }
  }

  async buscarPorId(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM mesa WHERE id_mesa = ?', [id]);
      connection.end();
      if (rows.length > 0) {
        const row = rows[0];
        return new Mesa(row.id_mesa, row.numero, row.capacidade, row.status, row.id_restaurante);
      }
      return null;
    } catch (error) {
      throw new Error('Erro ao buscar mesa por ID: ' + error.message);
    }
  }

  async atualizarMesa(mesa) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'UPDATE mesa SET numero = ?, capacidade = ?, status = ?, id_restaurante = ? WHERE id_mesa = ?';
      await connection.execute(query, [
        mesa.numero,
        mesa.capacidade,
        mesa.status,
        mesa.idRestaurante,
        mesa.id
      ]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao atualizar mesa: ' + error.message);
    }
  }

  async deletarMesa(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute('DELETE FROM mesa WHERE id_mesa = ?', [id]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao deletar mesa: ' + error.message);
    }
  }
}

module.exports = MesaDAO;
