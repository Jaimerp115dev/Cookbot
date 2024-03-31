import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-miperfil',
    templateUrl: './miperfil.component.html',
    styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent {
    darkModeEnabled: boolean = false;
    archivoEnviado: boolean | null = null;
    mensaje: string = '';
    nombreUsuario: string = '';
    newUsername: string = '';
    errorMessage: string = '';
    selectedFile: File | null = null;
    id: string | null = null;
    url = 'https://ia-kong-dev.codingbuddy-4282826dce7d155229a320302e775459-0000.eu-de.containers.appdomain.cloud/api/plugin/any-client';

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    toggleDarkMode() {
        this.darkModeEnabled = !this.darkModeEnabled;
        document.body.classList.toggle('dark-mode', this.darkModeEnabled);
        document.body.classList.toggle('light-mode', !this.darkModeEnabled);
    }

    ngOnInit(): void {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            this.nombreUsuario = storedUsername;
        } else {
            this.nombreUsuario = "No existe nombre de usuario";
        }
    }

    logout() {
        const url = 'http://127.0.0.1:5000/logout';
        localStorage.removeItem('username')
        localStorage.removeItem('access_token')
        this.http.get(url).subscribe(
            (response: any) => {
                console.log(response);
                this.router.navigate(['/login']);
            },
            (error) => {
                console.error('Error:', error);
                this.errorMessage = 'Error al cerrar sesión. Por favor, inténtalo de nuevo.';
            }
        );
    }
    navigateMisrecetas() {
        this.router.navigate(['/misrecetas']);
    }

    navigateHomepage() {
        this.router.navigate(['/homepage']);
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0] as File;
    }

    uploadFile(): void {
        const token = localStorage.getItem('access_token');
        const storedUsername = localStorage.getItem('username');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };

        if (this.selectedFile) {
            const extension = this.selectedFile.name.split('.').pop()?.toLowerCase();
            if (extension === 'pdf') {
                const formData = new FormData();
                formData.append('file', this.selectedFile);
                formData.append('username', storedUsername || '');

                this.http.post<any>('http://127.0.0.1:5000/send_pdf', formData)
                    .subscribe(response => {
                        this.archivoEnviado = true;
                        this.mensaje = ('Archivo enviado correctamente');
                        console.log('Respuesta del servidor:', response);
                        if (response && response.status === 'success') {
                            localStorage.setItem('file_uploaded', 'True');
                        }
                    }, error => {
                        this.archivoEnviado = false;
                        this.mensaje = ('No se ha podido enviar el archivo');
                        console.error('Error en la solicitud:', error);
                    });
            } else {
                alert('Por favor, selecciona un archivo PDF.');
            }
        } else {
            alert('Por favor, selecciona un archivo.');
        }
    }

    changeUsername(): void {
        const token = localStorage.getItem('access_token');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };

        if (this.newUsername) {
            this.http.post<any>('http://127.0.0.1:5000/change_username', { new_username: this.newUsername }, httpOptions)
                .subscribe(response => {
                    console.log('Respuesta del servidor:', response);
                    if (response && response.mensaje === 'Nombre de usuario actualizado exitosamente') {
                        this.nombreUsuario = this.newUsername;
                        localStorage.setItem('username', this.newUsername);
                    } else {
                        alert('Error al cambiar el nombre de usuario.');
                    }
                }, error => {
                    console.error('Error en la solicitud:', error);
                    alert('Error en la solicitud. Por favor, inténtalo de nuevo.');
                });
        } else {
            alert('Por favor, introduce un nuevo nombre de usuario.');
        }
    }
}
