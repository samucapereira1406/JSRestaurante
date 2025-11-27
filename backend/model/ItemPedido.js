class ItemPedido {
  constructor(id, idPedido, idItem, quantidade) {
    this.id = id;
    this.idPedido = idPedido;
    this.idItem = idItem;
    this.quantidade = quantidade;
  }
}

module.exports = ItemPedido;
