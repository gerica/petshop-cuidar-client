import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';

import { PrimeiroLoginComponent } from './primeiro-login.component';

@NgModule({
    imports: [CommonModule, RouterModule,FormsModule, AlertModule],
    declarations: [PrimeiroLoginComponent],
    exports: [PrimeiroLoginComponent]
})

export class PrimeiroLoginModule { }
