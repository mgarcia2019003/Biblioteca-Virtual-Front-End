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
    this.magazine = new Magazine('','','','','','',null,'','',null,null,'',0);
    this.user = new User('','','','','',null,'','','',0);
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.listMagazines();
  }

  listMagazines(){
    this.restMagazine.getMagazine().subscribe((res:any) => {
      if(res.magazineFind){
        if(this.magazines != undefined && this.magazines.length > 0){
          this.magazines = this.magazines+res.leagueFind;
        }else{
          this.magazines = res.magazineFind;
        }
      }else{
        alert(res.message)
      }
    },
    error => alert(error.message));
  }

  obtenerData(league){
    this.magazineSelect = league;
    localStorage.setItem('magazineSelect', JSON.stringify(this.magazineSelect));
    this.route.navigateByUrl('magazineSelect')
  }

}