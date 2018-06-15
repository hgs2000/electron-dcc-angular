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

export class CPF extends Codigo {
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

export class CNPJ extends Codigo {
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