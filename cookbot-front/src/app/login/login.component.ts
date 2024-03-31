import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    user = new FormControl('');
    constructor(private router: Router, private http: HttpClient) { }
    password = new FormControl('');
    errorMessage = '';

    onSubmit() {
        const url = 'http://127.0.0.1:5000/login';
        const body = { username: this.user.value, password: this.password.value };

        this.http.post(url, body).subscribe(
            (response: any) => {
                const tokenJWT = response.access_token;
                localStorage.setItem('access_token', tokenJWT);
                localStorage.setItem('username', response.username);
                localStorage.setItem('user_id', response.user_id);
                this.router.navigate(['/homepage']);

            },
            (error) => {
                console.error('Error:', error);
                this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
            }
        );
    }

    navigateHomepage() {
        this.router.navigate(['/homepage']);
    }




}