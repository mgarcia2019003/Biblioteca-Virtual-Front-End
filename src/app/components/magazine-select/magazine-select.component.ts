import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Magazine } from 'src/app/models/magazine';
import { Router } from '@angular/router';
import { RestMagazineService } from 'src/app/services/restMagazine/rest-magazine.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { ElementRef, ViewChild } from '@angular/core';  
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-magazine-select',
  templateUrl: './magazine-select.component.html',
  styleUrls: ['./magazine-select.component.css']
})
export class MagazineSelectComponent implements OnInit {
    public magazine: Magazine;
    magazineSelect: Magazine;
    public uri: string;
    public token;
    user; 

    constructor(private restMagazine:RestMagazineService, private restUser:RestUserService,private route:Router) {
        this.uri = CONNECTION.URI;
    }

    ngOnInit(): void {
    this.magazine = this.restMagazine.getMagazine();
    this.magazine = this.restMagazine.getMagazineSelect();
    this.user = JSON.parse(localStorage.getItem('user'));
    }

    obtenerData(magazine){
        this.magazineSelect = magazine;
        this.route.navigateByUrl('profileMagazine')
      }

}