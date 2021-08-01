import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaComponent } from './lista/lista.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { NovoComponent } from './novo/novo.component';
import { ProdutoRoutingModule } from './produto.routing';
import { ProdutoAppComponent } from './produto.app.component';
import { ProdutoService } from './services/produto.service';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutoResolve } from './services/produto.resolve';

@NgModule({
  declarations: [
    ProdutoAppComponent,
    ListaComponent,
    DetalhesComponent,
    EditarComponent,
    ExcluirComponent,
    NovoComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    NgBrazil,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    ProdutoService,
    ProdutoResolve,
  ]
})
export class ProdutoModule { }
