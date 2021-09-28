import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { RestBookService } from 'src/app/services/restBook/rest-book.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { CONNECTION } from '../../services/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: string;
  user;
  uri;
  public book: Book;

  constructor(private route:Router, private restUser: RestUserService,  private restBook: RestBookService) {

  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.uri = CONNECTION.URI;
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('home')
  }
}
