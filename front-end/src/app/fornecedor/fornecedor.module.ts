import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorAppComponent } from './fornecedor.app.component';
import { ListaComponent } from './lista/lista.component';
import { FornecedorRoutingModule } from './fornecedor.route';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { NovoComponent } from './novo/novo.component';
import { FornecedorService } from './services/fornecedor.service';
import { HttpClientModule } from '@angular/common/http';



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
    FornecedorRoutingModule,
    HttpClientModule
  ],
  providers:[
    FornecedorService
  ]
})
export class FornecedorModule { }
