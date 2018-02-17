import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers:[OfertasService]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = '';

  constructor(private rote: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    this.rote.parent.params.subscribe((parametros: Params) => {
      this.ofertasService.getOndeFicaOfertaPorID(parametros.id)
        .then((ondeFica: string)=>this.ondeFica=ondeFica)
    });
  }

}
