import { Component } from '@angular/core';

@Component({
    templateUrl: require('./lista-cpfs.component.html'),
    styleUrls: [require('./lista-cpfs.component.scss')]
})
export class ListaCPFsComponent {
    pessoas: Array<PessoaFisica> = new Array<PessoaFisica>()
    get PESSOAS() {
        return this.pessoas;
    }
}