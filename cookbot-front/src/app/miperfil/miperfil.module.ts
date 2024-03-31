import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiperfilComponent } from './miperfil.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [MiperfilComponent],
    imports: [CommonModule, FormsModule],
    exports: [MiperfilComponent]
})
export class MiperfilModule { }
