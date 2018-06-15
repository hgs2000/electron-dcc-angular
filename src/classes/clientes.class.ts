import { Telefone } from "./telefones.class";
import { CPF, CNPJ } from "./pessoas.class";

abstract class Cliente {
    private tfixo: Telefone = null;
    private tcelu: Telefone = null;
    constructor(
        private nome: string,
        private email: string,
        telefone: string = "",
        celular: string = ""
    ) {
        if (telefone !== "") {
            this.tfixo = new Telefone(telefone);
        }
        if (celular !== "") {
            this.tcelu = new Telefone(celular);
        }
    }

    get NOME() { return this.nome; }
    set NOME(novo: string) { this.nome = novo; }
    get EMAIL() { return this.email }
    set EMAIL(novo: string) { this.email }
    get TELEFONE(): string {
        if (this.tfixo !== null) {
            return this.tfixo.get()
        } else {
            return "Não disponível"
        }
    }
    set TELEFONE(novo: string) { this.tfixo = new Telefone(novo) }
    get CELULAR(): string {
        if (this.tfixo !== null) {
            return this.tcelu.get()
        } else {
            return "Não disponível"
        }
    }
    set CELULAR(novo: string) { this.tfixo = new Telefone(novo) }
}

export class PessoaFisica extends Cliente {
    private cpf: CPF;
    constructor(
        cpf: string,
        nome: string,
        email: string,
        telefone: string = "",
        celular: string = ""
    ) {
        super(nome, email, telefone, celular);
        this.CPF = cpf;
    }

    get CPF() { return this.cpf.get; }
    set CPF(novo: string) { this.cpf.set = novo }
}

export class PessoaJuridica extends Cliente {
    private cnpj: CNPJ;
    constructor(
        cnpj: string,
        nome: string,
        email: string,
        telefone: string = "",
        celular: string = ""
    ) {
        super(nome, email, telefone, celular);
        this.cnpj = new CNPJ(cnpj);
    }
    get CNPJ() { return this.cnpj.get; }
    set CNPJ(novo: string) { this.cnpj.set = novo }
}

