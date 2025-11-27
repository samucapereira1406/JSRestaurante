const mysql = require('mysql2/promise');
const Cliente = require('../model/Cliente');

class ClienteDAO {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async criarCliente(cliente) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'INSERT INTO cliente (nome, telefone, email, senha) VALUES (?, ?, ?, ?)';
      const [result] = await connection.execute(query, [cliente.nome,cliente.telefone,cliente.email,cliente.senha ]);
      connection.end();
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao criar cliente: ' + error.message);
    }
  }

  async listarClientes() {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM cliente');
      connection.end();
      return rows.map(row => new Cliente(row.id_cliente, row.nome, row.telefone, row.email, row.senha));
    } catch (error) {
      throw new Error('Erro ao listar clientes: ' + error.message);
    }
  }

  async buscarPorId(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM cliente WHERE id_cliente = ?', [id]);
      connection.end();
      if (rows.length > 0) {
        const row = rows[0];
        return new Cliente(row.id_cliente, row.nome, row.telefone, row.email);
      }
      return null;
    } catch (error) {
      throw new Error('Erro ao buscar cliente por ID: ' + error.message);
    }
  }

  async atualizarCliente(cliente) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'UPDATE cliente SET nome = ?, telefone = ?, email = ? WHERE id_cliente = ?';
      await connection.execute(query, [cliente.nome, cliente.telefone, cliente.email, cliente.id]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao atualizar cliente: ' + error.message);
    }
  }

  async deletarCliente(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute('DELETE FROM cliente WHERE id_cliente = ?', [id]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao deletar cliente: ' + error.message);
    }
  }
}

module.exports = ClienteDAO;
