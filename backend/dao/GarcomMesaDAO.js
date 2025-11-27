const mysql = require('mysql2/promise');
const GarcomMesa = require('../model/GarcomMesa');

class GarcomMesaDAO {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async associarGarcomMesa(idGarcom, idMesa, idRestaurante) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'INSERT INTO garcom_mesa (id_garcom, id_mesa, id_restaurante) VALUES (?, ?, ?)';
      await connection.execute(query, [idGarcom, idMesa, idRestaurante]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao associar garçom à mesa: ' + error.message);
    }
  }

  async listarMesasPorGarcom(idGarcom) {
  try {
    const connection = await mysql.createConnection(this.dbConfig);
    const [rows] = await connection.execute(
      `SELECT gm.id_mesa, m.numero 
       FROM garcom_mesa gm
       JOIN mesa m ON gm.id_mesa = m.id_mesa
       WHERE gm.id_garcom = ?`,  // ✅ aqui estava faltando o WHERE
      [idGarcom]
    );
    connection.end();
    return rows;
  } catch (error) {
    throw new Error('Erro ao listar mesas do garçom: ' + error.message);
  }
}


  async removerAssociacao(idGarcom, idMesa) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute(
        'DELETE FROM garcom_mesa WHERE id_garcom = ? AND id_mesa = ?',
        [idGarcom, idMesa]
      );
      connection.end();
    } catch (error) {
      throw new Error('Erro ao remover associação: ' + error.message);
    }
  }

  async listarTodasAssociacoes() {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM garcom_mesa');
      connection.end();
      return rows;
    } catch (error) {
      throw new Error('Erro ao listar associações de garçom/mesa: ' + error.message);
    }
  }
}

module.exports = GarcomMesaDAO;
