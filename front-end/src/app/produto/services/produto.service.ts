import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { BaseService } from "src/app/services/base.service";
import { Produto } from "../models/produto";

@Injectable()
export class ProdutoService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    obterTodos(): Observable<Produto[]> {
        return this.http
            .get<Produto[]>(this.UrlServiceV1 + "produtos", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

}