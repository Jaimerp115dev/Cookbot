import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})

export class RegistroComponent {

  constructor(private http: HttpClient, private router: Router) { }

  user = new FormControl('');
  password = new FormControl('');
  password_auth = new FormControl('');
  errorMessage = '';

  onSubmit() {
      const url = 'http://127.0.0.1:5000/register';
      const body = { "username": this.user.value, "password": this.password.value };

      if (this.password.value == this.password_auth.value) {
          this.http.post(url, body).subscribe(
              (response: any) => {
                  console.log(response);
                  const tokenJWT =response;
                  localStorage.setItem('access_token', tokenJWT.toString());
                  this.router.navigate(['/login']);
              },
              (error) => {
                  console.error('Error:', error.error.mensaje);
                  this.errorMessage = error.error.mensaje;
              }
          );
      } else {
          this.errorMessage = 'Las contraseñas no coinciden';
      }
  }

  navigateHomepage() {
      this.router.navigate(['/homepage']);
  }
}