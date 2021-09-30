import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { Loan } from 'src/app/models/loan';
import { Book } from 'src/app/models/book';
import { RestLoanService } from 'src/app/services/restLoan/rest-loan.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrls: ['./my-loans.component.css']
})
export class MyLoansComponent implements OnInit {
  loans: [];
  searchLoan;
  loan;
  loanSelect: Loan;
  user: User;
  today;
  book: Book;
  possiblePass;
  token;

  constructor(private restLoan: RestLoanService, private restUser:RestUserService, private route: Router) { 

  }

  ngOnInit(): void {
    this.today = new Date().toISOString().slice(0,10);
    this.loan = new Loan('',[],[],[],this.today);
    this.loan
    this.user = new User('','','','','','',null,'','',0);
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.listMyLoans();
  }

  listMyLoans(){
    this.restLoan.getMyLoan(this.user._id).subscribe((res:any) => {
      if(res.loans){
        this.loans = res.loans;
      }else{
        alert(res.message)
      }
    },
    error => alert(error.message));
  }
  
  deleteBookLoan(){
    this.restLoan.deleteBookLoan(this.user._id ,this.book._id,this.loan).subscribe((res:any) => {
      if(!res.bookRemoved){
        alert(res.message);
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.message)
    )
  }

  obtenerData(loan){
    this.loanSelect = loan;
    localStorage.setItem('loanSelect', JSON.stringify(this.loanSelect));
    this.route.navigateByUrl('loanSelect')
    this.deleteBookLoan();
  }

}