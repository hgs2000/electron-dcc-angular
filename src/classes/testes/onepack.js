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
            return "Não disponível";
        }
    }
    set TELEFONE(novo) { this.tfixo = new Telefone(novo); }
    get CELULAR() {
        if (this.tfixo !== null) {
            return this.tcelu.get();
        }
        else {
            return "Não disponível";
        }
    }
    set CELULAR(novo) { this.tfixo = new Telefone(novo); }
}
class PessoaFisica extends Cliente {
    constructor(cpf, nome, email, telefone = "", celular = "") {
        super(nome, email, telefone, celular);
        this.cpf = new CPF(cpf);
    }
    get CPF() { return this.cpf.get; }
    set CPF(novo) { this.cpf.set = novo; }
}
class PessoaJuridica extends Cliente {
    constructor(cnpj, nome, email, telefone = "", celular = "") {
        super(nome, email, telefone, celular);
        this.cnpj = new CNPJ(cnpj);
    }
    get CNPJ() { return this.cnpj.get; }
    set CNPJ(novo) { this.cnpj.set = novo; }
}
class Codigo {
    get get() { return `${this.corpo}-${this.digito}`; }
    set set(novo) {
        let split = this.split(novo);
        if (/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(novo)) {
            this.corpo = split[0];
            this.digito = split[1];
        }
        else {
            console.error("Precisa ser valido.");
        }
    }
    get valido() { return false; }
    split(cpf) { return cpf.split('-'); }
    constructor(valor) { this.set = valor; }
}
class CPF extends Codigo {
    get valido() {
        let soma = this.calcula([this.corpo], 10) % 11;
        let digito = "";
        if (soma < 2) {
            digito += 0;
        }
        else {
            digito += (11 - soma);
        }
        soma = this.calcula([this.corpo, digito], 11);
        digito += 11 - (soma % 11);
        console.log(digito);
        return digito === this.digito;
    }
    calcula(vals, cont1) {
        let soma = 0;
        let corpo = "";
        vals.forEach(valor => {
            corpo += valor;
        });
        corpo.split('').forEach(char => {
            if (char !== '.') {
                soma += parseInt(char) * cont1;
                cont1--;
            }
        });
        return soma;
    }
}
class CNPJ extends Codigo {
    get valido() {
        let digito = "";
        let soma = this.calculo([this.corpo], 5);
        //console.log(soma);
        if (soma < 2) {
            digito += 0;
        }
        else {
            digito += 11 - soma;
        }
        soma = this.calculo([this.corpo, digito], 6);
        if (soma < 2) {
            digito += 0;
        }
        else {
            digito += 11 - soma;
        }
        //console.log(digito);
        return digito === this.digito;
    }
    calculo(vals, cont1) {
        let corpo = '';
        let soma = 0;
        let cont2 = 9;
        vals.forEach(val => {
            corpo += val;
        });
        corpo = corpo.replace('.', '').replace('.', '').replace('/', '');
        let cont = 0;
        //console.log(corpo)
        while (cont1 > 1) {
            //console.log(cont)
            let a = parseInt(corpo.split('')[cont]);
            if (!isNaN(a)) {
                //console.log(`${a} * ${cont1}`)
                soma += a * cont1;
                cont1--;
            }
            cont++;
        }
        while (cont < corpo.length) {
            let a = parseInt(corpo.split('')[cont]);
            if (!isNaN(a)) {
                //console.log(`${a} * ${cont2}`)
                soma += a * cont2;
                cont2--;
            }
            cont++;
        }
        return soma % 11;
    }
}
class Telefone {
    constructor(numero) {
        this.regex = /\({0,1}(\d{2})\){0,1} {0,1}(\d{4,5})-{0,1}(\d{4})/;
        this.set(numero);
    }
    get() { return `(${this.ddd}) ${this.num1}-${this.num2}`; }
    set(numero) {
        if (this.regex.test(numero) && numero.length <= 15) {
            let split = numero.split(this.regex).splice(1, 3);
            this.ddd = split[0];
            this.num1 = split[1];
            this.num2 = split[2];
        }
        else {
            console.error('Número informado é inválido. Formato correto: "(XX) xXXXX-XXXX" (x minúsculo é caso especial).');
        }
    }
}
/*let cpf = new PessoaFisica("050.022.899-08", "Henrique Starosky", "hgs.true@gmail.com");
console.log(
`CPF: ${cpf.CPF}
Nome: ${cpf.NOME}
Email: ${cpf.EMAIL}
Telefone Fixo: ${cpf.TELEFONE}
Telefone Celular: ${cpf.CELULAR}`
);*/
let cpf = new PessoaJuridica("72746.534/0001-72", "Henrique Starosky", "hgs.true@gmail.com");
console.log(`cnpj: ${cpf.CNPJ}
Nome: ${cpf.NOME}
Email: ${cpf.EMAIL}
Telefone Fixo: ${cpf.TELEFONE}
Telefone Celular: ${cpf.CELULAR}`);
