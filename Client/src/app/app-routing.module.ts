import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component'
import { AddFormComponent } from './add-form/add-form.component';
import {LoginComponent} from './login/login.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'create', component: AddFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
