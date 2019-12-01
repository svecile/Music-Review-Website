import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import{AuthService} from './auth.service';
import { AdminComponent } from './admin/admin.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DMCAComponent } from './dmca/dmca.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    PrivacyComponent,
    DMCAComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthService, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
