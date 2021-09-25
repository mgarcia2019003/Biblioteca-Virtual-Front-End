import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { Magazine } from 'src/app/models/magazine';
import { RestMagazineService } from 'src/app/services/restMagazine/rest-magazine.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-profile-magazine',
  templateUrl: './profile-magazine.component.html',
  styleUrls: ['./profile-magazine.component.css']
})

export class ProfileMagazineComponent implements OnInit {
  public magazine: Magazine;
  magazineSelect: Magazine;
  public userAdmin: User;
  public possiblePass;
  public uri: string;
  public token; 
  public filesToUpload: Array<File>;
  user;

  constructor(private restMagazine:RestMagazineService, private restUser:RestUserService, private route:Router) {
    this.possiblePass = '';
    this.user = this.restUser.getUser();
    this.token = this.restMagazine.getToken();
    this.magazine = this.restMagazine.getMagazineSelect();
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {    
  }


  obtenerData(magazine){
    this.restMagazine = magazine;
    this.route.navigateByUrl('profileMagazine')
  }

  onSubmit(){
    this.restMagazine.updateMagazine(this.user, this.magazine).subscribe((res:any) => {
      if(res.magazineUpdate){
        localStorage.setItem('restMagazine', JSON.stringify(res.magazineUpdate))
        alert(res.message);
        this.route.navigateByUrl('listMagazine');
      }else{
        alert(res.message);
        this.magazine = this.restMagazine.getMagazineSelect();
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  deleteMagazine(){
    this.restMagazine.deleteMagazine(this.user._id ,this.magazine._id).subscribe((res:any) => {
      if(!res.magazineRemoved){
        alert(res.message);
      }else{
        alert(res.message);
        localStorage.removeItem('magazineSelect');
        this.route.navigateByUrl('listMagazine');
      }
    },
    (error:any) => alert(error.message)
    )
  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  uploadImage(){
    this.restMagazine.uploadImage(this.user._id,this.magazine._id, [], this.filesToUpload, this.token, 'cover')
    .then((res:any) => {
      if(res.magazine){
        this.magazine.cover = res.cover;
        localStorage.setItem('magazine', JSON.stringify(this.magazine));
      }else{
        alert(res.message)
      }
    })
  }

}