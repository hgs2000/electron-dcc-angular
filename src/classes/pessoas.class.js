class Codigo {
    get get() { return `${this.corpo}-${this.digito}`; }
    set set(novo) {
        let split = this.split(novo);
        this.corpo = split[0];
        this.digito = split[1];
    }
    get valido() {
        return false;
    }
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
        console.log(soma);
        if (soma < 2) {
            digito += 0;
        }
        else {
            digito += 11 - soma;
        }
        soma = this.calculo([this.corpo, digito], 6);
        digito += soma;
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
        while (cont < cont1) {
            console.log(cont);
            let a = parseInt(corpo.split('')[cont]);
            if (!isNaN(a)) {
                console.log(`${a} * ${cont1}`);
                soma += a * cont1;
                cont1--;
            }
            cont++;
        }
        while (cont < corpo.length) {
            let a = parseInt(corpo.split('')[cont]);
            if (!isNaN(a)) {
                console.log(`${a} * ${cont2}`);
                soma += a * cont2;
                cont2--;
            }
            cont++;
        }
        return soma; // % 11;
    }
}
let cnpj = new CNPJ("80.894.955/0001-79");
//console.log(cnpj.valido);
console.log("Soma:" + (11 - cnpj.calculo(["80.894.955/00017"], 6) % 11));
