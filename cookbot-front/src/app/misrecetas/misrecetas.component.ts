import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-misrecetas',
    templateUrl: './misrecetas.component.html',
    styleUrls: ['./misrecetas.component.css']
})
export class MisrecetasComponent implements OnInit {
    darkModeEnabled: boolean = false;
    recipes: any[] = [];
    selectedRecipe: any;

    constructor(private http: HttpClient, private router: Router) { }

    toggleDarkMode() {
        this.darkModeEnabled = !this.darkModeEnabled;
        document.body.classList.toggle('dark-mode', this.darkModeEnabled);
        document.body.classList.toggle('light-mode', !this.darkModeEnabled);
    }

    ngOnInit(): void {
        this.loadRecipes();
    }

    loadRecipes(): void {
        const token = localStorage.getItem('access_token');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };

        this.http.get<any[]>('http://127.0.0.1:5000/recipes', httpOptions)
            .subscribe(data => {
                this.recipes = data;
                if (this.recipes.length > 0) {
                    this.loadRecipeDetails(this.recipes[0]._id);
                }
            });
    }

    loadRecipeDetails(recipeId: string): void {
        const token = localStorage.getItem('access_token');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };

        this.http.get<any>('http://127.0.0.1:5000/recipes/' + recipeId, httpOptions)
            .subscribe(recipe => {
                this.selectedRecipe = recipe;
            });
    }

    deleteRecipe(recipeId: string): void {
        const token = localStorage.getItem('access_token');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };

        this.http.delete('http://127.0.0.1:5000/recipes/delete/' + recipeId, httpOptions)
            .subscribe(() => {
                this.recipes = this.recipes.filter(recipe => recipe._id !== recipeId);
                this.selectedRecipe = null;
            }, error => {
                console.error('Error al eliminar la receta:', error);
            });
    }

    navigateHomepage() {
        this.router.navigate(['/homepage']);
    }

    navigateMiperfil() {
        this.router.navigate(['/miperfil']);
    }
}
