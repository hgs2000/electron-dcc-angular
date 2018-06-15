import { Telefone } from "./telefones.class";

class Cliente {
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
    get TELEFONE() {
        if (this.tfixo !== null) {
            return this.tfixo.get()
        } else {
            ""
        }
    }
    set TELEFONE(novo: string) { this.tfixo = new Telefone(novo) }
    get CELULAR() {
        if (this.tfixo !== null) {
            return this.tfixo.get()
        } else {
            ""
        }
    }
    set CELULAR(novo: string) { this.tfixo = new Telefone(novo) }
}

let cli = new Cliente("", "", "47 33393773", "47996439994");
console.log(`Telefone Fixo: ${cli.TELEFONE}`);
console.log(`Telefone Celular ${cli.CELULAR}`);

