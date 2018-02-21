import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers:[OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: any;

  constructor(private rote: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    this.rote.parent.params.subscribe((parametros: Params) => {
      this.ofertasService.getComoUsarOfertaPorID(parametros.id)
        .then((comoUsar: any)=>this.comoUsar=comoUsar)
    });
  }

}
