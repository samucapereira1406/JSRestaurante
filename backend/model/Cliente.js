class Cliente {
    constructor(id, nome, telefone, email, senha) {
      this.id = id;
      this.nome = nome;
      this.telefone = telefone;
      this.email = email;
      this.senha = senha; // será apenas decorativa, não faremos autenticação real
    }
  }
  
  module.exports = Cliente;
  