import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { RestBookService } from 'src/app/services/restBook/rest-book.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { ElementRef, ViewChild } from '@angular/core';  
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-book-select',
  templateUrl: './book-select.component.html',
  styleUrls: ['./book-select.component.css']
})
export class BookSelectComponent implements OnInit {
    public book: Book;
    bookSelect: Book;
    public uri: string;
    public token;
    user; 

    constructor(private restBook:RestBookService, private restUser:RestUserService,private route:Router) {
        this.uri = CONNECTION.URI;
    }

    ngOnInit(): void {
    this.book = this.restBook.getBook();
    this.book = this.restBook.getBookSelect();
    this.user = JSON.parse(localStorage.getItem('user'));
    }

    obtenerData(book){
        this.bookSelect = book;
        this.route.navigateByUrl('profileBook')
      }

}