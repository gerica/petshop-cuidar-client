import { SharedModule } from './shared/shared.module';
import { PrimeiroLoginModule } from './primeiro-login/primeiro-login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SignupModule } from './signup/signup.module';
import { routes } from './app.routing';
import { RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    LoginModule,
    SignupModule,
    DashboardModule,
    PrimeiroLoginModule,
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
