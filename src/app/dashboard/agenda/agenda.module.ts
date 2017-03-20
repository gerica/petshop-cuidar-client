import { AgendaComponent } from './agenda.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CalendarComponent } from "angular2-fullcalendar/src/calendar/calendar";

@NgModule({
    imports: [SharedModule],
    declarations: [AgendaComponent, CalendarComponent],
})

export class AgendaModule { }
