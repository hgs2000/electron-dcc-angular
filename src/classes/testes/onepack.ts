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
class PessoaFisica extends Cliente {
    private cpf: CPF;
    constructor(
        cpf: string,
        nome: string,
        email: string,
        telefone: string = "",
        celular: string = ""
    ) {
        super(nome, email, telefone, celular);
        this.cpf = new CPF(cpf);
    }

    get CPF() { return this.cpf.get; }
    set CPF(novo: string) { this.cpf.set = novo }
}
class PessoaJuridica extends Cliente {
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
abstract class Codigo {
    corpo: string;
    digito: string;
    get get() { return `${this.corpo}-${this.digito}` }
    set set(novo: string) {
        let split = this.split(novo);
        if (/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(novo)) {
            this.corpo = split[0];
            this.digito = split[1];
        } else {
            console.error("Precisa ser valido.")
        }
    }
    get valido(): boolean { return false }
    private split(cpf: string): Array<string> { return cpf.split('-'); }
    constructor(valor: string) { this.set = valor; }
}
class CPF extends Codigo {
    get valido(): boolean {
        let soma = this.calcula([this.corpo], 10) % 11;
        let digito = "";
        if (soma < 2) {
            digito += 0
        } else {
            digito += (11 - soma);
        }
        soma = this.calcula([this.corpo, digito], 11);
        digito += 11 - (soma % 11);
        console.log(digito)
        return digito === this.digito;
    }
    private calcula(vals: Array<string>, cont1: number): number {
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
    get valido(): boolean {
        let digito = "";
        let soma = this.calculo([this.corpo], 5);
        //console.log(soma);
        if (soma < 2) {
            digito += 0;
        } else {
            digito += 11 - soma
        }
        soma = this.calculo([this.corpo, digito], 6);
        if (soma < 2) {
            digito += 0;
        } else {
            digito += 11 - soma
        }
        //console.log(digito);

        return digito === this.digito;
    }
    private calculo(vals: Array<string>, cont1: number): number {
        let corpo = '';
        let soma = 0;
        let cont2 = 9;
        vals.forEach(val => {
            corpo += val
        });
        corpo = corpo.replace('.', '').replace('.', '').replace('/', '');
        let cont = 0;
        //console.log(corpo)
        while (cont1 > 1) {
            //console.log(cont)
            let a = parseInt(corpo.split('')[cont])
            if (!isNaN(a)) {
                //console.log(`${a} * ${cont1}`)
                soma += a * cont1;
                cont1--;
            }
            cont++;
        }

        while (cont < corpo.length) {
            let a = parseInt(corpo.split('')[cont])
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
    private ddd: string;
    private num1: string;
    private num2: string;

    private regex = /\({0,1}(\d{2})\){0,1} {0,1}(\d{4,5})-{0,1}(\d{4})/;

    constructor(numero: string) { this.set(numero); }

    get() { return `(${this.ddd}) ${this.num1}-${this.num2}` }
    set(numero: string) {
        if (this.regex.test(numero) && numero.length <= 15) {
            let split = numero.split(this.regex).splice(1, 3);
            this.ddd = split[0];
            this.num1 = split[1];
            this.num2 = split[2];
        } else { console.error('Número informado é inválido. Formato correto: "(XX) xXXXX-XXXX" (x minúsculo é caso especial).') }
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
/*let cpf = new PessoaJuridica("72.746.534/0001-72", "Henrique Starosky", "hgs.true@gmail.com");
console.log(
    `cnpj: ${cpf.CNPJ}
Nome: ${cpf.NOME}
Email: ${cpf.EMAIL}
Telefone Fixo: ${cpf.TELEFONE}
Telefone Celular: ${cpf.CELULAR}`
);*/