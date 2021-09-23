import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserByAdminComponent } from './components/create-user-by-admin/create-user-by-admin.component';
import { HomeComponent } from './components/home/home.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileUserSelectComponent } from './components/profile-user-select/profile-user-select.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { ListBookComponent } from './components/list-book/list-book.component';
import { ProfileBookComponent } from './components/profile-book/profile-book.component';
import { LoginGuardGuard } from './guards/login-guard.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: 'Home', pathMatch:'full'},
  {path: 'home', component: HomeComponent },
  {path: 'navbar', component: NavbarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'createUser', component: CreateUserByAdminComponent},
  {path: 'listUsers', component: ListUserComponent},
  {path: 'profileUserSelect', component: ProfileUserSelectComponent},
  {path: 'createBook', component: CreateBookComponent},
  {path: 'listBook', component: ListBookComponent},
  {path: 'profileBook', component: ProfileBookComponent},
  {path: '**' ,pathMatch   : 'full', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuardGuard]
})
export class AppRoutingModule { }
