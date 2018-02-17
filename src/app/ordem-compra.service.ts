import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import Pedido from './shared/pedido.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrdemCompraService {

    constructor(private http: Http){}
    
    efetivarCompra(pedido: Pedido): Observable<number> {
        console.log(pedido);
        
        const headers: Headers = new Headers();
        headers.append('Content-type','application/json');

        return this.http.post(
            'http://localhost:3000/pedidos',
            JSON.stringify(pedido),
            new RequestOptions({headers: headers})
        )
        .map((resposta: Response)=> resposta.json().id);
    }
}