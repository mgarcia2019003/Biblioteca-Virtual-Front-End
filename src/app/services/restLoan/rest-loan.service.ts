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

  createBookLoan(user, book){
    let params = JSON.stringify(book);
    return this.http.post(this.uri+user+'/createBookLoan/'+book, params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  createMagazineLoan(user, magazine){
    let params = JSON.stringify(magazine);
    return this.http.post(this.uri+user+'/createMagazineLoan/'+magazine, params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }
}