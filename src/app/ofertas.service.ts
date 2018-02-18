import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import Oferta from './shared/oferta.model';
import { URL_API } from './app.url'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class OfertasService {

    constructor(private http: Http){}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any)=>resposta.json());
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any)=>resposta.json());
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas/${id}`)
            .toPromise()
            .then((resposta: any)=>resposta.json());
    }

    public getComoUsarOfertaPorID(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar/${id}`)
        .toPromise()
        .then((resposta: any)=>resposta.json());
    }

    public getOndeFicaOfertaPorID(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica/${id}`)
        .toPromise()
        .then((resposta: any)=>resposta.json());
    }

    public pesquisarOfertas(termo: string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .map((resposta) => resposta.json());
    }

}