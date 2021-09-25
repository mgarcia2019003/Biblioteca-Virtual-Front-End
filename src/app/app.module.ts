import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //formularios y todo lo que lleve consigo, funciones ng
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleChartsModule } from 'angular-google-charts';  

//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RestUserService } from './services/restUser/rest-user.service';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateUserByAdminComponent } from './components/create-user-by-admin/create-user-by-admin.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ProfileUserSelectComponent } from './components/profile-user-select/profile-user-select.component';

import { RestBookService } from './services/restBook/rest-book.service';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { ListBookComponent } from './components/list-book/list-book.component';
import { ProfileBookComponent } from './components/profile-book/profile-book.component';
import { BookSelectComponent } from './components/book-select/book-select.component';

import { RestMagazineService } from './services/restMagazine/rest-magazine.service';
import { CreateMagazineComponent } from './components/create-magazine/create-magazine.component';
import { ListMagazineComponent } from './components/list-magazine/list-magazine.component';
import { ProfileMagazineComponent } from './components/profile-magazine/profile-magazine.component';
import { MagazineSelectComponent } from './components/magazine-select/magazine-select.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CreateUserByAdminComponent,
    ListUserComponent,
    ProfileUserSelectComponent,
    CreateBookComponent,
    ListBookComponent,
    ProfileBookComponent,
    BookSelectComponent,
    CreateMagazineComponent,
    ListMagazineComponent,
    ProfileMagazineComponent,
    MagazineSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleChartsModule
  ],
  providers: [
    RestUserService,
    RestBookService,
    RestMagazineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
