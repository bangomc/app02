import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { OrdemCompraService } from '../ordem-compra.service';
import Pedido from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra-reactive',
  templateUrl: './ordem-compra-reactive.component.html',
  styleUrls: ['./ordem-compra-reactive.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraReactiveComponent implements OnInit {

  idPedido: number;

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(120)
      ]),
    'numero': new FormControl(null,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null,
      [
        Validators.required
      ])
  })

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
  }

  confirmarCompra(): void {
    const pedido: Pedido = new Pedido(
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento
    );

    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((idPedido: number) => {
        this.idPedido = idPedido;
      });
  }

}
