import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import Pedido from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  idPedidoCompra: number;

  endereco: string = '';
  numero: string = '';
  complemento: string = '';
  formaPagamento: string = '';

  enderecoValido: boolean;
  numeroValido: boolean;
  complementoValido: boolean;
  formaPagamentoValido: boolean;

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
  }

  atualizaEndereco(endereco: string): void {
    this.endereco = endereco;
    if(this.endereco.length>3){
      this.enderecoValido = true;
    }else{
      this.enderecoValido = false;
    }
  }

  atualizaNumero(numero: string): void {
    this.numero = numero;
    if(this.numero.length>0){
      this.numeroValido = true;
    }else{
      this.numeroValido = false;
    }
  }

  atualizaComplemento(complemento: string): void {
    this.complemento = complemento;
    if(this.complemento.length>0){
      this.complementoValido = true;
    }else{
      this.complementoValido = false;
    }
  }

  atualizaFormaPagamento(fp: string): void {
    this.formaPagamento = fp;
    if(fp === ''){
      this.formaPagamentoValido = false;
    }else{
      this.formaPagamentoValido = true;
    }
  }

  confirmarPedido(){
    const pedido: Pedido = new Pedido(this.endereco,this.numero,this.complemento,this.formaPagamento);
    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((idPedidoCompra: number) => {
        this.idPedidoCompra = idPedidoCompra;
      })
  }

}
