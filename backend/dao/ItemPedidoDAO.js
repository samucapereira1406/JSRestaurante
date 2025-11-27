const mysql = require('mysql2/promise');
const ItemPedido = require('../model/ItemPedido');

class ItemPedidoDAO {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async adicionarItem(item) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'INSERT INTO item_pedido (id_pedido, id_item, quantidade) VALUES (?, ?, ?)';
      const [result] = await connection.execute(query, [
        item.idPedido,
        item.idItem,
        item.quantidade
      ]);
      connection.end();
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao adicionar item ao pedido: ' + error.message);
    }
  }

  async listarPorPedido(idPedido) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute(
        'SELECT * FROM item_pedido WHERE id_pedido = ?',
        [idPedido]
      );
      connection.end();
      return rows.map(row =>
        new ItemPedido(row.id_item_pedido, row.id_pedido, row.id_item, row.quantidade)
      );
    } catch (error) {
      throw new Error('Erro ao listar itens do pedido: ' + error.message);
    }
  }

  async deletarItem(idItemPedido) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute('DELETE FROM item_pedido WHERE id_item_pedido = ?', [idItemPedido]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao deletar item do pedido: ' + error.message);
    }
  }

  async limparPedido(idPedido) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute('DELETE FROM item_pedido WHERE id_pedido = ?', [idPedido]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao limpar itens do pedido: ' + error.message);
    }
  }
}

module.exports = ItemPedidoDAO;
