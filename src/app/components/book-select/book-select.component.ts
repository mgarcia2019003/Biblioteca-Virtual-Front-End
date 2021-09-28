import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Loan } from 'src/app/models/loan';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { RestBookService } from 'src/app/services/restBook/rest-book.service';
import { RestLoanService } from 'src/app/services/restLoan/rest-loan.service';
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
    public loan: Loan;
    bookSelect: Book;
    public uri: string;
    public token;
    user; 
    today;

    constructor(private restBook:RestBookService, private restUser:RestUserService, private restLoan:RestLoanService,private route:Router) {
        this.uri = CONNECTION.URI;
    }

    ngOnInit(): void {
    this.book = this.restBook.getBookSelect();
    this.user = JSON.parse(localStorage.getItem('user'));
    }

    obtenerData(book){
        this.bookSelect = book;
        this.route.navigateByUrl('profileBook')
    }

    createBookLoan(){
      this.restLoan.createBookLoan(this.user._id, this.book._id).subscribe((res:any) => {
        if(res.loanSaved){
          alert(res.message);
          this.today = new Date().toISOString().slice(0,10);
          this.loan = new Loan('',this.user._id,[],[],this.today);
          this.route.navigateByUrl('listBook');
        }else{
          alert(res.message);
        }
      },
      error => alert(error.message));
    }

}