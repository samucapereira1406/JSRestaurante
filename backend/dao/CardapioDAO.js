const mysql = require('mysql2/promise');
const Cardapio = require('../model/Cardapio');

class CardapioDAO {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async criarItem(item) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'INSERT INTO cardapio (nome, preco, id_restaurante) VALUES (?, ?, ?)';
      const [result] = await connection.execute(query, [
        item.nome,
        item.preco,
        item.idRestaurante
      ]);
      connection.end();
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao criar item do cardápio: ' + error.message);
    }
  }

  async listarItens() {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM cardapio');
      connection.end();
      return rows.map(row =>
        new Cardapio(row.id_item, row.nome, row.preco, row.id_restaurante)
      );
    } catch (error) {
      throw new Error('Erro ao listar itens do cardápio: ' + error.message);
    }
  }

  async buscarPorId(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM cardapio WHERE id_item = ?', [id]);
      connection.end();
      if (rows.length > 0) {
        const row = rows[0];
        return new Cardapio(row.id_item, row.nome, row.preco, row.id_restaurante);
      }
      return null;
    } catch (error) {
      throw new Error('Erro ao buscar item do cardápio: ' + error.message);
    }
  }

  async atualizarItem(item) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'UPDATE cardapio SET nome = ?, preco = ?, id_restaurante = ? WHERE id_item = ?';
      await connection.execute(query, [
        item.nome,
        item.preco,
        item.idRestaurante,
        item.id
      ]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao atualizar item do cardápio: ' + error.message);
    }
  }

  async deletarItem(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute('DELETE FROM cardapio WHERE id_item = ?', [id]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao deletar item do cardápio: ' + error.message);
    }
  }

  async listarItensPorRestaurante(idRestaurante) {
  try {
    const connection = await mysql.createConnection(this.dbConfig);
    const [rows] = await connection.execute(
      'SELECT id_item, nome, preco FROM cardapio WHERE id_restaurante = ?',
      [idRestaurante]
    );
    connection.end();
    return rows.map(row =>
      new Cardapio(row.id_item, row.nome, row.preco, idRestaurante)
    );
  } catch (error) {
    throw new Error('Erro ao listar cardápio por restaurante: ' + error.message);
  }
}

}

module.exports = CardapioDAO;
