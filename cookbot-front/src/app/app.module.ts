import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisrecetasModule } from './misrecetas/misrecetas.module';
import { MiperfilModule } from './miperfil/miperfil.module';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        LoginComponent,
        RegistroComponent,
        NotfoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MisrecetasModule,
        MiperfilModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
