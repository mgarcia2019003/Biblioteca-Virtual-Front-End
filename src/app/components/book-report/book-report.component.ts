import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { Book } from 'src/app/models/book';
import { RestReportService } from 'src/app/services/restReport/rest-report.service';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-book-report',
  templateUrl: './book-report.component.html',
  styleUrls: ['./book-report.component.css']
})
export class BookReportComponent implements OnInit {
  books: [];
  book;


  constructor(private restReport: RestReportService, private restUser:RestUserService, private route: Router) { 
  }

  ngOnInit(): void {
    
    this.book = new Book('','','','',[],'','',null, null,'',0);
    this.book
    this.sortBook();

  }

  sortBook(){
    this.restReport.sortBook().subscribe((res:any) => {
      if(res.books){
        this.books = res.books;
        console.log(res.message);
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
  }
  

}