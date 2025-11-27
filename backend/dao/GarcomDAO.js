const mysql = require('mysql2/promise');
const Garcom = require('../model/Garcom');

class GarcomDAO {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async criarGarcom(garcom) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'INSERT INTO garcom (nome, email, senha, id_restaurante) VALUES (?, ?, ?, ?)';
      const [result] = await connection.execute(query, [
          garcom.nome,
          garcom.email,
          garcom.senha,
          garcom.idRestaurante
        ]);
      connection.end();
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao criar garçom: ' + error.message);
    }
  }

  async listarGarcons() {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM garcom');
      connection.end();
      return rows.map(row =>
        new Garcom(row.id_garcom, row.nome, row.email, row.senha, row.id_restaurante)
      );
    } catch (error) {
      throw new Error('Erro ao listar garçons: ' + error.message);
    }
  }

  async buscarPorId(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM garcom WHERE id_garcom = ?', [id]);
      connection.end();
      if (rows.length > 0) {
        const row = rows[0];
        return new Garcom(row.id_garcom, row.nome, row.telefone, row.email, row.senha, row.id_restaurante);
      }
      return null;
    } catch (error) {
      throw new Error('Erro ao buscar garçom por ID: ' + error.message);
    }
  }

  async atualizarGarcom(garcom) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'UPDATE garcom SET nome = ?, email = ?, senha = ?, id_restaurante = ? WHERE id_garcom = ?';
          await connection.execute(query, [
            garcom.nome,
            garcom.email,
            garcom.senha,
            garcom.idRestaurante,
            garcom.id
          ]);

      connection.end();
    } catch (error) {
      throw new Error('Erro ao atualizar garçom: ' + error.message);
    }
  }

  async deletarGarcom(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute('DELETE FROM garcom WHERE id_garcom = ?', [id]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao deletar garçom: ' + error.message);
    }
  }
}

module.exports = GarcomDAO;
