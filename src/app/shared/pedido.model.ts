import { ItemCarrinho } from "./item-carrinho.model";

export default class Pedido {
     
  constructor(
        public endereco: string,
        public numero: string,
        public complemento: string,
        public formaPagamento: string,
        public itens: ItemCarrinho[]
    ){}
}