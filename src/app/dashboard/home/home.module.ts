import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { AlertModule } from 'ngx-bootstrap';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [SharedModule, AlertModule],
    declarations: [HomeComponent],
})

export class HomeModule {}
