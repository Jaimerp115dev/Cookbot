import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MisrecetasComponent } from './misrecetas/misrecetas.component';
import { MiperfilComponent } from './miperfil/miperfil.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: 'homepage', component:HomepageComponent},
  { path:'login', component:LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'registro', component:RegistroComponent},
  { path:'misrecetas', component:MisrecetasComponent},
  { path:'miperfil', component:MiperfilComponent},
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
