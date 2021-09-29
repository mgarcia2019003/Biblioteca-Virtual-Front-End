import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestBookService {
  
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
  public book;
  public bookSelect;

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

  createBook(user, book){
    let params = JSON.stringify(book);
    return this.http.post(this.uri+user+'/createBook/', params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  updateBook(user,book){
    let params = JSON.stringify(book);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri+'/'+user._id+'/updateBook/'+book._id, params, {headers: headers})
    .pipe(map(this.extractData));
  }

  /*deleteBook(user, book){
    return this.http.post(this.uri+user+'/deleteBook/'+book ,this.httpOptionAuth)
    .pipe(map(this.extractData));
  }*/


  deleteBook(user, book, password){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    return this.http.put(this.uri+user+'/deleteBook/'+book, {password: password}, {headers: headers})
    .pipe(map(this.extractData));
  }


  getBook(){
    return this.http.get(this.uri+'/listBook', this.httpOptions)
    .pipe(map(this.extractData));
  }

  getBookSelect(){
    let bookSelect = JSON.parse(localStorage.getItem('bookSelect'));
    if(bookSelect != undefined || bookSelect != null){
      this.bookSelect = bookSelect;
    }else{
      this.bookSelect = null;
    }
    return this.bookSelect;
  }


  uploadImage(idUser,idBook, params: Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+idUser+'/'+idBook+'/uploadImage';

      for(var i=0; i<files.length; i++){
        formData.append(name, files[i], files[i].name)
      }
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('PUT', uri, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

}