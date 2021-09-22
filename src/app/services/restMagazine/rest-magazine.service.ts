import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestMagazineService {
  
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
  public magazineSelect;

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

  createMagazine(user, magazine){
    let params = JSON.stringify(magazine);
    return this.http.post(this.uri+user+'/createMagazine/', params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  updateMagazine(user,magazine){
    let params = JSON.stringify(magazine);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri+'/'+user._id+'/updateMagazine/'+magazine._id, params, {headers: headers})
    .pipe(map(this.extractData));
  }

  deleteMagazine(user, magazine){
    return this.http.post(this.uri+user+'/deleteMagazine/'+magazine, {} ,this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  getMagazine(){
    let magazine = JSON.parse(localStorage.getItem('magazine'));
    if(magazine != undefined || magazine != null){
      this.magazine = magazine;
    }else{
      this.magazine = null;
    }
    return this.magazine;
  }

  getMagazineSelect(){
    let magazineSelect = JSON.parse(localStorage.getItem('magazineSelect'));
    if(magazineSelect != undefined || magazineSelect != null){
      this.magazineSelect = magazineSelect;
    }else{
      this.magazineSelect = null;
    }
    return this.magazineSelect;
  }


  uploadImage(idUser,idMagazine, params: Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+idUser+'/'+idMagazine+'/uploadImage';

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