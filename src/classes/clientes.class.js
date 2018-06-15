import { Telefone } from "./telefones.class";
class Cliente {
    constructor(nome, email, telefone = "", celular = "") {
        this.nome = nome;
        this.email = email;
        this.tfixo = null;
        this.tcelu = null;
        if (telefone !== "") {
            this.tfixo = new Telefone(telefone);
        }
        if (celular !== "") {
            this.tcelu = new Telefone(celular);
        }
    }
    get NOME() { return this.nome; }
    set NOME(novo) { this.nome = novo; }
    get EMAIL() { return this.email; }
    set EMAIL(novo) { this.email; }
    get TELEFONE() {
        if (this.tfixo !== null) {
            return this.tfixo.get();
        }
        else {
            "";
        }
    }
    set TELEFONE(novo) { this.tfixo = new Telefone(novo); }
    get CELULAR() {
        if (this.tfixo !== null) {
            return this.tfixo.get();
        }
        else {
            "";
        }
    }
    set CELULAR(novo) { this.tfixo = new Telefone(novo); }
}
