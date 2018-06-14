import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./navigation-bar/navbar.component";
import { ListaCPFsComponent } from './paginas/lista-cpfs/lista-cpfs.component'

const routes: Routes = [{ path: '', component: AppComponent }, { path: 'cpfs', component: ListaCPFsComponent }]

@NgModule({
    imports: [
        BrowserModule,
        //RouterModule.forRoot(routes)
    ],
    exports: [AppComponent, NavbarComponent],
    declarations: [
        AppComponent,
        NavbarComponent,
        ListaCPFsComponent
    ],
    //providers: [Title],
    bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }