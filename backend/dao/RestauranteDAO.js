const mysql = require('mysql2/promise');
const Restaurante = require('../model/Restaurante');

class RestauranteDAO {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async criarRestaurante(restaurante) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'INSERT INTO restaurante (nome, telefone, email, senha) VALUES (?, ?, ?, ?)';
      const [result] = await connection.execute(query, [
        restaurante.nome,
        restaurante.telefone,
        restaurante.email,
        restaurante.senha
      ]);
      connection.end();
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao criar restaurante: ' + error.message);
    }
  }

  async listarRestaurantes() {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM restaurante');
      connection.end();
      return rows.map(row => new Restaurante(row.id_restaurante, row.nome, row.telefone, row.email, row.senha));
    } catch (error) {
      throw new Error('Erro ao listar restaurantes: ' + error.message);
    }
  }

  async buscarPorId(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM restaurante WHERE id_restaurante = ?', [id]);
      connection.end();
      if (rows.length > 0) {
        const row = rows[0];
        return new Restaurante(row.id_restaurante, row.nome, row.telefone, row.email, row.senha);
      }
      return null;
    } catch (error) {
      throw new Error('Erro ao buscar restaurante por ID: ' + error.message);
    }
  }

  async atualizarRestaurante(restaurante) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'UPDATE restaurante SET nome = ?, telefone = ?, email = ?, senha = ? WHERE id_restaurante = ?';
      await connection.execute(query, [
        restaurante.nome,
        restaurante.telefone,
        restaurante.email,
        restaurante.senha,
        restaurante.id
      ]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao atualizar restaurante: ' + error.message);
    }
  }

  async deletarRestaurante(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute('DELETE FROM restaurante WHERE id_restaurante = ?', [id]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao deletar restaurante: ' + error.message);
    }
  }
}

module.exports = RestauranteDAO;
