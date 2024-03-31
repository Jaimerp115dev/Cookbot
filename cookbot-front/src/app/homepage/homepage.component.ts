import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})

export class HomepageComponent {
    loading: boolean = false;
    darkModeEnabled: boolean = false;
    showUploadErrorMessage: boolean = false;
    currentIngredient: string = '';
    ingredients: string[] = [];
    recipeContent: any;
    interactWithPDF: boolean = true;
    // recipeContent: any = "Ensalada de pollo con lechuga, tomate, aceitunas y queso<br><br>Ingredientes:<br>- Lechuga<br>- Pollo cocido y desmenuzado<br>- Tomate cortado en cubos<br>- Aceitunas sin hueso<br>- Queso rallado<br><br>Pasos a seguir:<br>1. Lavar y cortar la lechuga en trozos pequeños y colocarla en un tazón grande.<br>2. Agregar el pollo desmenuzado a la lechuga.<br>3. Agregar los cubos de tomate y las aceitunas sin hueso al tazón.<br>4. Mezclar bien todos los ingredientes.<br>5. Espolvorear el queso rallado sobre la ensalada.<br>6. Servir frío y disfrutar.</p>Ensalada de pollo con lechuga, tomate, aceitunas y queso<br><br>Ingredientes:<br>- Lechuga<br>- Pollo cocido y desmenuzado<br>- Tomate cortado en cubos<br>- Aceitunas sin hueso<br>- Queso rallado<br><br>Pasos a seguir:<br>1. Lavar y cortar la lechuga en trozos pequeños y colocarla en un tazón grande.<br>2. Agregar el pollo desmenuzado a la lechuga.<br>3. Agregar los cubos de tomate y las aceitunas sin hueso al tazón.<br>4. Mezclar bien todos los ingredientes.<br>5. Espolvorear el queso rallado sobre la ensalada.<br>6. Servir frío y disfrutar.</p>Ensalada de pollo con lechuga, tomate, aceitunas y queso<br><br>Ingredientes:<br>- Lechuga<br>- Pollo cocido y desmenuzado<br>- Tomate cortado en cubos<br>- Aceitunas sin hueso<br>- Queso rallado<br><br>Pasos a seguir:<br>1. Lavar y cortar la lechuga en trozos pequeños y colocarla en un tazón grande.<br>2. Agregar el pollo desmenuzado a la lechuga.<br>3. Agregar los cubos de tomate y las aceitunas sin hueso al tazón.<br>4. Mezclar bien todos los ingredientes.<br>5. Espolvorear el queso rallado sobre la ensalada.<br>6. Servir frío y disfrutar.</p>"; 

    showModal: boolean = false;
    // showModal: boolean = true;

    constructor(private router: Router, private http: HttpClient) { }

    toggleDarkMode() {
        this.darkModeEnabled = !this.darkModeEnabled;
        document.body.classList.toggle('dark-mode', this.darkModeEnabled);
        document.body.classList.toggle('light-mode', !this.darkModeEnabled);
    }

    closeModal() {
        this.loading = false;
        this.showModal = false;
    }

    reloadRecipe() {
        this.showModal = false;
        this.recipeContent = '';
        this.generateRecipe();
    }

    saveRecipe(): void {
        const token = localStorage.getItem('access_token');
        const user_id = localStorage.getItem('user_id');
        const recipeLines = this.recipeContent.split('<br>');
        const title = recipeLines[0];
        if (!user_id) {
            console.error('ID de usuario no encontrado');
            return;
        }

        const recipeData = {
            user_id: user_id,
            title: title,
            description: this.recipeContent
        };

        this.http.post<any>('http://127.0.0.1:5000/recipes/save', recipeData)
            .subscribe(response => {
                console.log('Respuesta del servidor:', response.mensaje);
            }, error => {
                console.error('Error en la solicitud:', error);
            });
    }

    navigateHomepage() {
        this.router.navigate(['/homepage']);
    }

    navigateMisrecetas() {
        this.router.navigate(['/misrecetas']);
    }

    navigateMiperfil() {
        this.router.navigate(['/miperfil']);
    }

    handleKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.addIngredient();
        }
    }

    addIngredient(): void {
        if (this.currentIngredient.trim() !== '') {
            const formattedIngredients = this.currentIngredient.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).split(/[,]+/);

            for (const ingredient of formattedIngredients) {
                this.ingredients.push(ingredient.trim());
            }

            this.currentIngredient = '';
        }
        console.log(this.ingredients);
    }

    removeIngredient(index: number): void {
        this.ingredients.splice(index, 1);
    }

    generateRecipe(): void {
        this.showUploadErrorMessage = false;
        this.loading = true;
        if (!this.interactWithPDF) {
            this.sendIngredientsToEndpointNoPdf(this.ingredients);
            return;
        }

        const fileUploaded = localStorage.getItem('file_uploaded');
        console.log(fileUploaded);

        if (fileUploaded == null) {
            this.showUploadErrorMessage = true;
            this.loading = false;
            return;
        }

        this.sendIngredientsToEndpoint(this.ingredients);
    }

    sendIngredientsToEndpointNoPdf(ingredients: string[]): void {
        const token = localStorage.getItem('access_token');
        const storedID = localStorage.getItem('username');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        const formData = new FormData();
        formData.append('username', storedID || '');
        for (const ingrediente of ingredients) {
            formData.append('ingredientes[]', ingrediente);
        }
        this.http.post<any>('http://127.0.0.1:5000/generate_recipe_no_pdf', formData)
            .subscribe(response => {
                this.showModal = true;
                this.recipeContent = response.content.replace('AI##', '').replace(/\n/g, '<br>').replace('Nombre: ', '');

                console.log('Respuesta del servidor:', response.content);
            }, error => {
                console.error('Error en la solicitud:', error);
            });

    }

    sendIngredientsToEndpoint(ingredients: string[]): void {
        const token = localStorage.getItem('access_token');
        const storedID = localStorage.getItem('username');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        const formData = new FormData();
        formData.append('username', storedID || '');
        for (const ingrediente of ingredients) {
            formData.append('ingredientes[]', ingrediente);
        }
        this.http.post<any>('http://127.0.0.1:5000/generate_recipe', formData)
            .subscribe(response => {
                this.showModal = true;
                this.recipeContent = response.content.replace('AI##', '').replace(/\n/g, '<br>').replace('Nombre: ', '');

                console.log('Respuesta del servidor:', response.content);
            }, error => {
                console.error('Error en la solicitud:', error);
            });





    }
}
