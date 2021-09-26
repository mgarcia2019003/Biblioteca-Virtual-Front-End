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
  public book: Book;
  token: string;
  books: [];
  listBooks: [];
  searchBook;
  bookSelect: Book;

  constructor(private restBook: RestBookService, private restUser:RestUserService, private route: Router) { 
    this.user = this.restUser.getUser(); 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token == null){
      this.listBook();
    }else{
      this.listBook();
    }   
  }

  listBook(){
    this.restBook.getBook().subscribe((res : any)=>{
      if(res.bookFind){
        this.listBooks = res.bookFind;
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
  }
  

  obtenerData(book){
    this.bookSelect = book;
    localStorage.setItem('bookSelect', JSON.stringify(this.bookSelect));
    this.route.navigateByUrl('bookSelect')
  }

}