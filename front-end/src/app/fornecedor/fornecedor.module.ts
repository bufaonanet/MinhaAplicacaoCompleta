import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FornecedorService } from './services/fornecedor.service';
import { FornecedorRoutingModule } from './fornecedor.routing';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

import { FornecedorAppComponent } from './fornecedor.app.component';
import { ListaComponent } from './lista/lista.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { NovoComponent } from './novo/novo.component';
import { FornecedorResolve } from './services/fornecedor.resolve';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FornecedorGuard } from './services/fornecedor.guard';
import { ListaProdutosComponent } from './produtos/lista-produtos.component';


@NgModule({
  declarations: [
    FornecedorAppComponent,
    ListaComponent, 
    DetalhesComponent, 
    EditarComponent, 
    ExcluirComponent, 
    NovoComponent,
    ListaProdutosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    FornecedorRoutingModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule
  ],
  providers:[
    FornecedorService,
    FornecedorResolve,
    FornecedorGuard
  ]
})
export class FornecedorModule { }
