import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard]},
  { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthenticationGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
