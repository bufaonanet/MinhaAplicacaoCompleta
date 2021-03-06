import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { StringUtils } from 'src/app/utils/string-utils';
import { CepConsulta } from '../models/endereco';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  fornecedorForm: FormGroup;
  fornecedor: Fornecedor = new Fornecedor(); 

  formResult: string = '';
  textoDocumento = "CPF (Requerido)"

  public MASKS = MASKS;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService) {

      super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido',
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {

    this.fornecedorForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],

      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required, NgBrazilValidators.cep]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
      })
    });

    this.fornecedorForm.patchValue({ tipoFornecedor: '1', ativo: true })

  }

  ngAfterViewInit(): void {
    this.tipoFornecedorForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      this.configurarValidacaoFormularioBase(this.formInputElements,this.fornecedorForm);
      super.validarFormulario(this.fornecedorForm);
    });

    this.configurarValidacaoFormularioBase(this.formInputElements,this.fornecedorForm);
  }
 
  trocarValidacaoDocumento() {
    if (this.tipoFornecedorForm().value === "1") {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textoDocumento = "CPF (Requerido)";
    } else {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textoDocumento = "CNPJ (Requerido)";
    }
  }

  tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('tipoFornecedor');
  }

  documento(): AbstractControl {
    return this.fornecedorForm.get('documento');
  }

  adicionarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {
      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);
      this.formResult = JSON.stringify(this.fornecedor);

      this.fornecedor.endereco.cep = StringUtils.somenteNumeros(this.fornecedor.endereco.cep);
      this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);
      this.fornecedor.tipoFornecedor = StringUtils.removerAspasNumero(this.fornecedor.tipoFornecedor);

      this.fornecedorService.novoFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );      
    }
  }

  processarSucesso(response: any) {
    this.fornecedorForm.reset();
    this.errors = [];
    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  buscarCep(cep: string) {
    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.fornecedorService.consultarCep(cep)
      .subscribe(
        cpeRetorno => this.preencherEnderecoConsulta(cpeRetorno),
        erro => this.errors.push(erro)
      );
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {
    this.fornecedorForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        complemento: cepConsulta.complemento,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf,
      }
    });

  }

}
