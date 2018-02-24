import { Injectable } from '@angular/core';

import { ItemCarrinho } from './shared/item-carrinho.model';
import Oferta from './shared/oferta.model';

@Injectable()
export class CarrinhoService {

  itens: ItemCarrinho[] = [];

  constructor() { }

  exibirItens(): ItemCarrinho[]{
    return this.itens;
  }

  incluirItem(oferta: Oferta){
    const itemCarrinho: ItemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1
    );

    let itemCarrinhoEncontrato = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

    if(itemCarrinhoEncontrato){
      itemCarrinhoEncontrato.quantidade += 1;
    }else{
      this.itens.push(itemCarrinho);
    }

  }

  valorTotalItens(): number {
    let valorTotal:number = 0;

    this.itens.map((item:ItemCarrinho) => valorTotal += (item.quantidade * item.valor));

    return valorTotal;
  }

  incrementarQuantidadeItemCarrinho(itemCarrinho: ItemCarrinho) {
    let itemCarrinhoEncontrato = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

    if(itemCarrinhoEncontrato){
      itemCarrinhoEncontrato.quantidade += 1;
    }

  }

  decrementarQuantidadeItemCarrinho(itemCarrinho: ItemCarrinho) {
    let itemCarrinhoEncontrato = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

    if(itemCarrinhoEncontrato){
      itemCarrinhoEncontrato.quantidade -= 1;

      if(itemCarrinhoEncontrato.quantidade === 0){
        this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrato),1);
      }

    }
    
  }
  
  limparCarrinho(){
    this.itens = [];
  }
}
