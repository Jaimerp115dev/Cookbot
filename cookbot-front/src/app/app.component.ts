import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'cookbot-front';
    responseFromBackend: string = '';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {

    }

    navigateHomepage() {
        this.router.navigate(['/homepage']);
    }
    navigateMiperfil() {
        this.router.navigate(['/miperfil']);
    }
    navigateLogin() {
        this.router.navigate(['/login']);
    }
    navigateMisrecetas() {
        this.router.navigate(['/misrecetas']);
    }

}
