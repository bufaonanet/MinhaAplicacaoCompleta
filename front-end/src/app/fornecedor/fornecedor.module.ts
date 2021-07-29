import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FornecedorService } from './services/fornecedor.service';
import { FornecedorRoutingModule } from './fornecedor.route';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

import { FornecedorAppComponent } from './fornecedor.app.component';
import { ListaComponent } from './lista/lista.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { NovoComponent } from './novo/novo.component';
import { FornecedorResolve } from './services/fornecedor.resolve';


@NgModule({
  declarations: [
    FornecedorAppComponent,
    ListaComponent, 
    DetalhesComponent, 
    EditarComponent, 
    ExcluirComponent, 
    NovoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FornecedorRoutingModule,
    TextMaskModule,
    NgBrazil,
  ],
  providers:[
    FornecedorService,
    FornecedorResolve
  ]
})
export class FornecedorModule { }
