export class Telefone {
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