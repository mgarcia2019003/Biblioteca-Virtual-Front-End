import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { Book } from 'src/app/models/book';
import { RestBookService } from 'src/app/services/restBook/rest-book.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  public user: User;
  public uri: string;
  token: string;
  books: [];
  searchBook;
  book;
  bookSelect: Book;

  constructor(private restBook: RestBookService, private restUser:RestUserService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this. book = new Book('','','','',[],'','',null,null,'',0);
    this.user = new User('','','','','',null,'','','',0);
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.listBooks();
  }

  listBooks(){
    this.restBook.getBook().subscribe((res:any) => {
      if(res.bookFind){
        if(this.books != undefined && this.books.length > 0){
          this.books = this.books+res.leagueFind;
        }else{
          this.books = res.bookFind;
        }
      }else{
        alert(res.message)
      }
    },
    error => alert(error.message));
  }

  obtenerData(league){
    this.bookSelect = league;
    localStorage.setItem('bookSelect', JSON.stringify(this.bookSelect));
    this.route.navigateByUrl('bookSelect')
  }

}