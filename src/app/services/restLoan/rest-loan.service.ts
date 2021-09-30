import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestLoanService {
  
  public uri:string;
  public httpOptions = {
    headers:new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  public httpOptionAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  };

  public token;
  public magazine;
  public book;
  public loan;
  public loanSelect;

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }


  getLoan(){
    let loan = JSON.parse(localStorage.getItem('loan'));
    if(loan != undefined || loan != null){
      this.loan = loan;
    }else{
      this.loan = null;
    }
    return this.loan;
  }

  createBookLoan(user, book){
    return this.http.post(this.uri+user+'/createBookLoan/'+book, this.httpOptions)
    .pipe(map(this.extractData));
  }

  createMagazineLoan(user, magazine){
    return this.http.post(this.uri+user+'/createMagazineLoan/'+magazine, this.httpOptions)
    .pipe(map(this.extractData));
  }

  deleteBookLoan(user, book,loan){
    return this.http.post(this.uri+user+'/deleteBookLoan/'+book+loan, {} ,this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  getMyLoan(user){
    return this.http.get(this.uri+user+'/listMyLoans', this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  getLoanSelect(){
    let loanSelect = JSON.parse(localStorage.getItem('loanSelect'));
    if(loanSelect != undefined || loanSelect != null){
      this.loanSelect = loanSelect;
    }else{
      this.loanSelect = null;
    }
    return this.loanSelect;
  }



}