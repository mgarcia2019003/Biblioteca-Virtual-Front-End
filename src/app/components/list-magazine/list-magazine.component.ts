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
  magazines: [];
  searchMagazine;
  magazine;
  magazineSelect: Magazine;

  constructor(private restMagazine: RestMagazineService, private restUser:RestUserService, private route: Router) { 
 
  }

  ngOnInit(): void {
    /*this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.magazine = new Magazine('','','','','','',null,'','',null,null,'',0);
    if(this.token == null){
      this.listMagazine();
    }else{
      this.listMagazine();
    }   */

    this.magazine = new Magazine('','','','','','',null,'','',null,null,'',0);
    this.magazine
    this.listMagazine();
  }

  listMagazine(){
    this.restMagazine.getMagazine().subscribe((res : any)=>{
      if(res.magazines){
        this.magazines = res.magazines;
        console.log(res.message);
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