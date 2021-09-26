import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { Magazine } from 'src/app/models/magazine';
import { RestMagazineService } from 'src/app/services/restMagazine/rest-magazine.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-list-magazine',
  templateUrl: './list-magazine.component.html',
  styleUrls: ['./list-magazine.component.css']
})
export class ListMagazineComponent implements OnInit {
  public user: User;
  public uri: string;
  token: string;
  magazines: [];
  searchMagazine;
  magazine;
  magazineSelect: Magazine;

  constructor(private restMagazine: RestMagazineService, private restUser:RestUserService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.magazine = new Magazine('','','','','','',null,'','',null,null,'',0);
    if(this.token == null){
      this.listMagazines();
    }else{
      this.listMagazines();
    }   
  }

  listMagazines(){
    this.restMagazine.getMagazine().subscribe((res : any)=>{
      if(res.magazineFind){
        this.listMagazines = res.magazineFind;
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
  }

  obtenerData(magazine){
    this.magazineSelect = magazine;
    localStorage.setItem('magazineSelect', JSON.stringify(this.magazineSelect));
    this.route.navigateByUrl('magazineSelect')
  }

}


/*this.magazine = new Magazine('','','','','','',null,'','',null,null,'',0);
    this.user = new User('','','','','',null,'','','',0);
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.listMagazines();*/