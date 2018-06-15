import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./navigation-bar/navbar.component";
import { ListaCPFsComponent } from './paginas/lista-cpfs/lista-cpfs.component'

const routes: Routes = [{ path: 'cpfs', component: ListaCPFsComponent }]

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ListaCPFsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: [Title],
    bootstrap: [AppComponent]
})
export class AppModule { }