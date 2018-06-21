import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'main-app',
    templateUrl: require('./app.component.html'),
    styleUrls: [require('./app.component.scss')]
})
export class AppComponent {
    title = "Controle de Clientes Direcon"
    public constructor(private titleService: Title) { this.setTitle(this.title) }
    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}