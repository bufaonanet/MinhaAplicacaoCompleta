import { ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MASKS } from "ng-brazil";
import { FormBaseComponent } from "../base-components/form-base.component";

import { Fornecedor, Produto } from "./models/produto";

export abstract class ProdutoBaseComponent extends FormBaseComponent {

  produto: Produto;
  fornecedores: Fornecedor[];
  errors: any[] = [];
  produtoForm: FormGroup; 

  public MASKS = MASKS; 

  constructor() {

    super();

    this.validationMessages = {
      fornecedorId: {
        required: 'Escolha um fornecedor',
      },
      nome: {
        required: 'Informe o Nome',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 200 caracteres'
      },
      descricao: {
        required: 'Informe a Descrição',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 1000 caracteres'
      },
      imagem: {
        required: 'Informe a Imagem',
      },
      valor: {
        required: 'Informe o Valor',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.produtoForm);
  }
}