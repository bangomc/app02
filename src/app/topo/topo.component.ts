import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import Oferta from '../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Oferta[];
  private ofertasObs: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasObs = this.subjectPesquisa      
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((termo: string) => {
        if(termo.trim() === ''){
          return Observable.of<Oferta[]>([]);
        }
        console.log('requisicao http');
        return this.ofertasService.pesquisarOfertas(termo);
      })
      .catch((erro: any) => {
        console.log(erro);
        return Observable.of<Oferta[]>([]);
      });
      
    this.ofertasObs.subscribe((ofertas: Oferta[])=>{
      console.log(ofertas);
      this.ofertas = ofertas;
    });
  }

  pesquisar(pesquisa: string): void {
    console.log('pesquisa ',pesquisa);
    this.subjectPesquisa.next(pesquisa);
  }

  limparPesquisa(): void {
    this.subjectPesquisa.next('');
  }

}
