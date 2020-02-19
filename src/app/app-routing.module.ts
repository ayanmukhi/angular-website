import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'admin', component:AdminComponent, resolve: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, resolve: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
